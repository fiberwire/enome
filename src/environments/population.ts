import { IDisposable, Subject } from "rx";
import { Genome } from "../genotypes/genome";

import { IEvaluation } from "../interfaces/evaluation";
import { IGenomeOptions } from "../options/genome-options";
import { IPopulationOptions } from "../options/population-options";
import { ReactiveProperty } from "../reactive-property";
import { Organism } from "./organism";

export abstract class Population<
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    DataType, PhenoType, EnvStateType> {

    public organisms: Array<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;
    public toEvaluate: Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;
    public evaluations: Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>;
    public avgFitness: ReactiveProperty<number>;

    constructor(
        public genOptions: GenType,
        public popOptions: PopType) {
        this.toEvaluate = new Subject();
        this.evaluations = new Subject();
        this.avgFitness = new ReactiveProperty();
        this.evaluateData();
    }

    // evaluate organism's performance based on the data it collected.
    public abstract evaluate(
        organism: Organism<GenType, PopType, DataType, PhenoType, EnvStateType>,
    ): IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>;

    // create an organism to inject into environment.
    public abstract createOrganism(): Organism<GenType, PopType, DataType, PhenoType, EnvStateType>;

    // mutate the organism based on evaluation
    public abstract mutateOrganism(
        evaluation: IEvaluation<
            Organism<GenType, PopType, DataType, PhenoType, EnvStateType>,
            PhenoType>): Genome<GenType>;

    // evaluate data as it comes in
    private evaluateData() {
        this.toEvaluate
            .subscribe((org) => {
                this.evaluations.onNext(this.evaluate(org));
            });
    }

    // update genotypes as they are evaluated
    private updateGenotype() {
        this.evaluations
            .subscribe((e) => {
                this.avgFitness.value = e.fitness;
                e.organism.genotype.value = this.mutateOrganism(e);
            });
    }
}
