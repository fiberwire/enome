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

    public top: ReactiveCollection<IEvaluation<
    Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>> =
    new ReactiveCollection<IEvaluation<
        Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();

    public envs: ReactiveCollection<Environment<EnvStateType>>;
    public organisms: ReactiveCollection<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;

    private evaluations: Subject<
    IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>,
    PhenoType>> =
    new Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();

    private subs: IDisposable[];

    private generation: number = 0;
    private get nextEnv(): Environment<EnvStateType> {
        return _.sortBy(this.envs.value,
            (env) => this.organisms.filterCollection((o) => o.env === env).value.length)[0];
    }

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
            this.updateTop(),
            this.evaluateData(),
            this.mutateGenotype(),
            this.reproduceGenotype(),
            this.randomizeGenotype(),
        ];

        this.toEvaluate
            .do((e) => this.generation += 1)
            .do((e) => {
                if (this.popOptions.progress &&
                    this.generation % (this.popOptions.generations / 10) === 0) {
                    // tslint:disable-next-line:no-console
                    console.log(`
(${this.generation / this.popOptions.generations * 100}%) Generation: ${this.generation}
        best: ${this.best.value.fitness}
`);
                }
            })
            .skip(this.popOptions.generations)
            .take(1)
            .do((e) => {
                if (this.popOptions.progress) {
                    // tslint:disable-next-line:no-console
                    console.log(`Evolution completed after ${this.generation - 1} generations`);
                }

            })
            .subscribe((e) => this.dispose());

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
        genome: Genome<GenType>,
        options: IOrganismOptions): Organism<GenType, PopType, DataType, PhenoType, EnvStateType>;

    public dispose(): void {
        this.subs.forEach((s) => s.dispose());
        this.envs.forEach((env) => env.dispose());
    }

    // spawns and evenly distributes organisms across all envs
    public populate(): IDisposable {
        return this.envs.subscribe((envs) => {
            this.killOrganisms();

            while (this.organisms.value.length < this.popOptions.size) {
                this.organisms.push(
                    this.createOrganism(this, this.nextEnv, new Genome(this.genOptions), this.orgOptions));
            }
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
                org.dispose();
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

    private updateTop(): IDisposable {
        return this.evaluations
            .filter((e) => this.best.value != null && this.best.value !== undefined)
            .filter((e) => {
                switch (this.popOptions.objective) {
                    case FitnessObjective.minimize:
                        return e.fitness < this.best.value.fitness;

                    case FitnessObjective.maximize:
                    default:
                        return e.fitness > this.best.value.fitness;
                }
            })
            .select(cloneEvaluation)
            .subscribe((e) => {
                let top = this.top.value;
                top.push(e);
                top = _.sortBy(top, (t) => t.fitness);
                top = new Gene(this.popOptions.topPercent).elements(top);
                this.top.value = top;
            });
    }

    private mutateGenotype(): IDisposable {
        return this.toMutate
            .subscribe((e) => {
                const g = this.mutate(e);

                if (this.organisms.value.length >= this.popOptions.size) {
                    this.organisms.remove(e.organism);
                }

                this.organisms.push(this.createOrganism(this, this.nextEnv, g, this.orgOptions));
            });
    }

    private reproduceGenotype(): IDisposable {
        return this.toReproduce
            .filter((e) => this.organisms.value.length > 0)
            .subscribe((e) => {

                let offspring: Genome<GenType>;

                if (this.top.value.length <= 0) {
                    offspring = reproduceManyToOne(
                        this.organisms.mapCollection((t) => t.genotype.value).value);
                } else {
                    offspring = reproduceManyToOne(
                        this.top.mapCollection((t) => t.organism.genotype.value).value);
                }

                if (this.organisms.value.length >= this.popOptions.size) {
                    this.organisms.remove(e.organism);
                }

                this.organisms.push(this.createOrganism(this, this.nextEnv, offspring, this.orgOptions));
            });
    }

    private randomizeGenotype(): IDisposable {
        return this.toRandomize
            .subscribe((e) => {
                const g = new Genome(this.genOptions);

                if (this.organisms.value.length >= this.popOptions.size) {
                    this.organisms.remove(e.organism);
                }

                this.organisms.push(this.createOrganism(this, this.nextEnv, g, this.orgOptions));
            });
    }
}
