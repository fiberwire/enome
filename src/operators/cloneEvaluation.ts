import * as _ from "lodash";

import { IEvaluation, IGenomeOptions, IPopulationOptions, Organism } from "../index";

export function cloneEvaluation<
GenType extends IGenomeOptions, PopType extends IPopulationOptions, DataType, PhenoType, EnvStateType>(
    evaluation: IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType>):
    IEvaluation<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>, PhenoType> {
    return _.cloneDeep(evaluation);
}
