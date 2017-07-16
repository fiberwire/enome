import { IDisposable, Subject } from "rx";

import {
    Environment, Genome, IEvaluation, IGenomeOptions, IPopulationOptions, Organism, ReactiveProperty,
} from "../index";

import * as _ from "lodash";

export abstract class Population<
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    DataType, PhenoType, EnvStateType> {

    public toEvaluate: Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;
    public evaluations: Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>;
    public avgFitness: ReactiveProperty<number>;

    public envs: Array<Environment<GenType, PopType, DataType, PhenoType, EnvStateType>>;

    public get organisms(): Array<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>> {
        return _.concat([], ...this.envs
            .map((e) => e.organisms));
    }

    constructor(
        public genOptions: GenType,
        public popOptions: PopType) {
        this.toEvaluate = new Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>();
        this.evaluations =
            new Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>();
        this.avgFitness = new ReactiveProperty<number>();

        // set up environment
        this.setupEnvironments();
        this.updateGenotype();
        this.evaluateData();
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

    // set up all environments
    private setupEnvironments() {
        this.envs = _.range(this.popOptions.envs)
            .map((i) => this.createEnvironment());
    }
    // evaluate data as it comes in
    private evaluateData(): IDisposable {
        return this.toEvaluate
            .subscribe((org) => {
                this.evaluations.onNext(this.evaluate(org));
            });
    }

    // update genotypes as they are evaluated
    private updateGenotype(): IDisposable {
        return this.evaluations
            .subscribe((e) => {
                this.avgFitness.value = (this.avgFitness.value + e.fitness) / 2;
                e.organism.genotype.value = this.mutate(e);
            });
    }
}
