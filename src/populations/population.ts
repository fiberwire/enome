import { IDisposable, Subject } from "rx";

import {
    cloneEvaluation,
    cloneOrganism,
    Environment,
    FitnessObjective,
    Gene,
    Genome,
    IEvaluation,
    IGenomeOptions,
    IOrganismOptions,
    IPopulationOptions,
    Organism,
    ReactiveCollection,
    ReactiveProperty,
    reproduceManyToOne,
    value,
} from "../index";

import * as Chance from "chance";
import * as _ from "lodash";
const chance = new Chance();

export abstract class Population<
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    DataType, PhenoType, EnvStateType> {

    public toEvaluate: Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>> =
    new Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>();

    public toMutate: Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>> =
    new Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();

    public toRandomize: Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>> =
    new Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();

    public toReproduce: Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>> =
    new Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();

    public avgFitness: ReactiveProperty<number> = new ReactiveProperty<number>();
    public best: ReactiveProperty<IEvaluation<
    Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>> =
    new ReactiveProperty<IEvaluation<
        Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();

    public envs: ReactiveCollection<Environment<EnvStateType>>;
    public organisms: ReactiveCollection<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;

    private evaluations: Subject<
    IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>,
    PhenoType>> =
    new Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();

    private subs: IDisposable[];

    constructor(
        public genOptions: GenType,
        public popOptions: PopType,
        public orgOptions: IOrganismOptions,
        ...envs: Array<Environment<EnvStateType>>) {
        this.envs = new ReactiveCollection<Environment<EnvStateType>>(envs);
        this.organisms = new ReactiveCollection<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>();

        this.subs = [
            this.populate(),
            this.updateGenotype(),
            this.updateAvgFitness(),
            this.updateBest(),
            this.evaluateData(),
            this.mutateGenotype(),
            this.reproduceGenotype(),
            this.randomizeGenotype(),
        ];
    }

    // evaluate organism's performance based on the data it collected.
    public abstract evaluate(
        organism: Organism<GenType, PopType, DataType, PhenoType, EnvStateType>,
    ): IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>;

    // mutate the organism based on evaluation
    public abstract mutate(
        evaluation: IEvaluation<
            Organism<GenType, PopType, DataType, PhenoType, EnvStateType>,
            PhenoType>): Genome<GenType>;

    // create an organism to inject into environment.
    public abstract createOrganism(
        pop: Population<GenType, PopType, DataType, PhenoType, EnvStateType>,
        env: Environment<EnvStateType>,
        options: IOrganismOptions): Organism<GenType, PopType, DataType, PhenoType, EnvStateType>;

    public dispose(): void {
        this.subs.forEach((s) => s.dispose());
    }

    // spawns and evenly distributes organisms across all envs
    public populate(): IDisposable {
        return this.envs.subscribe((envs) => {
            this.killOrganisms();

            envs.forEach((env) => {
                const orgs = _
                    .range(this.popOptions.size / this.envs.value.length)
                    .map((i) => this.createOrganism(this, env, this.orgOptions));

                orgs.forEach((org) => this.organisms.push(org));
            });
        });
    }

    private killOrganisms(): void {
        this.organisms.forEach((o) => {
            o.dispose();
            o = null;
        });
        this.organisms.value = [];
    }

    // evaluate organism data as it comes in
    private evaluateData(): IDisposable {
        return this.toEvaluate
            .filter((org) => org.data.value.length > 0)
            .subscribe((org) => {
                this.evaluations.onNext(this.evaluate(org));
            });
    }

    // update genotypes as they are evaluated
    private updateGenotype(): IDisposable {
        return this.evaluations
            .subscribe((e) => {
                // randomly choose between mutating, reproducing, or randomizing
                // mutation is twice as likely as reproduction
                // reproduction is twice as likely as randomization
                chance
                    .weighted([
                        this.toMutate,
                        this.toReproduce,
                        this.toRandomize,
                    ],
                    [
                        this.popOptions.weights.mutate,
                        this.popOptions.weights.reproduce,
                        this.popOptions.weights.randomize],
                )
                    .onNext(e);
            });
    }

    private updateAvgFitness(): IDisposable {
        return this.evaluations
            .subscribe((e) => {
                this.avgFitness.value = (this.avgFitness.value + e.fitness) / 2;
            });
    }

    private updateBest(): IDisposable {
        return this.evaluations
            .do((e) => { // set as best if there is no current best
                if (this.best.value === undefined) {
                    this.best.value = e;
                }
            })
            .filter((e) => {
                switch (this.popOptions.objective) {
                    case FitnessObjective.minimize:
                        return e.fitness < this.best.value.fitness;

                    case FitnessObjective.maximize:
                    default:
                        return e.fitness > this.best.value.fitness;
                }
            })
            // .do((e) => console.log(`new best: ${e.fitness} (old best: ${this.best.value.fitness})`))
            .select(cloneEvaluation)
            .do((e) => e.organism.dispose())
            .subscribe((e) => this.best.value = e);
    }

    private mutateGenotype(): IDisposable {
        return this.toMutate
            .subscribe((e) => {
                e.organism.genotype.value = this.mutate(e);
            });
    }

    private reproduceGenotype(): IDisposable {
        return this.toReproduce
            .subscribe((e) => {
                e.organism.genotype.value = reproduceManyToOne(
                    this.organisms.mapCollection((o) => o.genotype.value).value);
            });
    }

    private randomizeGenotype(): IDisposable {
        return this.toRandomize
            .subscribe((e) => {
                e.organism.genotype.value = new Genome(e.organism.genotype.value.options);
            });
    }
}
