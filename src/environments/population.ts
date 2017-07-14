import { Subject } from "rx";

import { IEvaluation } from "../interfaces/evaluation";
import { IGenomeOptions } from "../options/genome-options";
import { IPopulationOptions } from "../options/population-options";
import { Organism } from "./organism";

export abstract class Population<
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    DataType, PhenoType, EnvStateType> {

    public organisms: Array<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;
    public toEvaluate: Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;
    public evaluations: Subject<IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>>;

    constructor(
        public genOptions: GenType,
        public popOptions: PopType) {
        this.toEvaluate = new Subject();
        this.evaluations = new Subject();

        this.evaluateData();
    }

    public abstract evaluate(
        organism: Organism<GenType, PopType, DataType, PhenoType, EnvStateType>,
    ): IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>;

    public abstract createOrganism(): Organism<GenType, PopType, DataType, PhenoType, EnvStateType>;

    private evaluateData() {
        this.toEvaluate
            .subscribe((org) => {
                this.evaluations.onNext(this.evaluate(org));
            });
    }

    private updateGenotype() {
        this.evaluations
            .subscribe((e) => {
                // mutate genome
                // send genome to organism
            });
    }
}
