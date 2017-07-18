
import * as _ from "lodash";
import { IGenomeOptions, IPopulationOptions, IStateUpdate, Organism } from "../index";

export interface Interaction<
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    DataType, PhenoType, EnvStateType> extends IStateUpdate<EnvStateType> {
    organism: Organism<GenType, PopType, DataType, PhenoType, EnvStateType>;
}
