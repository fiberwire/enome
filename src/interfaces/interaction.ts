import { IGenomeOptions, IPopulationOptions, IStateUpdate, Organism } from "../index";

export interface IInteraction
<GenType extends IGenomeOptions,
PopType extends IPopulationOptions,
DataType, PhenoType, EnvStateType> {
    interaction: IStateUpdate<EnvStateType>;
    organism: Organism<GenType, PopType, DataType, PhenoType, EnvStateType>;
}
