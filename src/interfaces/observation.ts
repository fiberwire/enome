import { IGenomeOptions, IPopulationOptions, Organism } from "../index";

export interface IObservation<
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    DataType, PhenoType, EnvStateType> {
    observation: DataType;
    organism: Organism<GenType, PopType, DataType, PhenoType, EnvStateType>;
}
