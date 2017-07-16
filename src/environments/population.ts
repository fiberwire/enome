import { IDisposable, Subject } from "rx";
import { Genome } from "../genotypes/genome";
import { Environment } from "./environment";

import { IEvaluation } from "../interfaces/evaluation";
import { IGenomeOptions } from "../options/genome-options";
import { IPopulationOptions } from "../options/population-options";
import { ReactiveProperty } from "../reactive-property";
import { Organism } from "./organism";

import * as _ from "lodash";

export abstract class Population<
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    DataType, PhenoType, EnvStateType> {

    public organisms: Array<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>> = [];
    public toEvaluate: Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;
    public evaluations: Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>;
    public avgFitness: ReactiveProperty<number>;

    public env: Environment<GenType, PopType, DataType, PhenoType, EnvStateType>;

    constructor(
        public genOptions: GenType,
        public popOptions: PopType) {
        this.toEvaluate = new Subject();
        this.evaluations = new Subject();
        this.avgFitness = new ReactiveProperty();

        // set up environment
        this.env = this.createEnvironment();
        this.updateGenotype();
        this.evaluateData();
    }

    // evaluate organism's performance based on the data it collected.
    public abstract evaluate(
        organism: Organism<GenType, PopType, DataType, PhenoType, EnvStateType>,
    ): IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>;

    // mutate the organism based on evaluation
    public abstract mutateOrganism(
        evaluation: IEvaluation<
            Organism<GenType, PopType, DataType, PhenoType, EnvStateType>,
            PhenoType>): Genome<GenType>;

    // set up environment
    public abstract createEnvironment(): Environment<GenType, PopType, DataType, PhenoType, EnvStateType>;

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
                e.organism.genotype.value = this.mutateOrganism(e);
            });
    }
}
