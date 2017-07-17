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
    IPopulationOptions,
    Organism,
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

    public toEvaluate: Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;
    public toMutate: Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>;
    public toRandomize: Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>;
    public toReproduce: Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>;
    public evaluations: Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>;
    public avgFitness: ReactiveProperty<number>;
    public best: ReactiveProperty<IEvaluation<
    Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>;

    public envs: Array<Environment<GenType, PopType, DataType, PhenoType, EnvStateType>>;

    private subs: IDisposable[];

    public get organisms(): Array<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>> {
        return _.concat([], ...this.envs
            .map((e) => e.organisms));
    }

    constructor(
        public genOptions: GenType,
        public popOptions: PopType) {
        this.toEvaluate = new Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>();

        this.toMutate =
            new Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();

        this.toReproduce =
            new Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();

        this.toRandomize =
            new Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();

        this.evaluations =
            new Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();
        this.avgFitness = new ReactiveProperty<number>();
        this.best = new ReactiveProperty<IEvaluation<
            Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();

        this.subs = [
            this.updateGenotype(),
            this.updateAvgFitness(),
            this.updateBest(),
            this.evaluateData(),
            this.mutateGenotype(),
            this.reproduceGenotype(),
            this.randomizeGenotype(),
        ];

        // set up environment
        this.setupEnvironments();
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

    // set up environment
    public abstract createEnvironment(): Environment<GenType, PopType, DataType, PhenoType, EnvStateType>;

    public dispose(): void {
        this.subs.forEach((s) => s.dispose());
    }
    // set up all environments
    private setupEnvironments() {
        this.envs = _.range(this.popOptions.envs)
            .map((i) => this.createEnvironment());
    }

    // evaluate data as it comes in
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
                    console.log(`No best, setting best to ${e.organism.genotype.value.id}`);
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
            .do((e) => console.log(`new best: ${e.fitness} (old best: ${this.best.value.fitness})`))
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
                e.organism.genotype.value = reproduceManyToOne(this.organisms.map((o) => o.genotype.value));
            });
    }

    private randomizeGenotype(): IDisposable {
        return this.toRandomize
            .subscribe((e) => {
                e.organism.genotype.value = new Genome(e.organism.genotype.value.options);
            });
    }
}
