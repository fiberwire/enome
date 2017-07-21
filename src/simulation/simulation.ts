import { IGenomeOptions, IOrganismOptions, IPopulationOptions, Population } from "../index";

export class Simulation<GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    OrgType extends IOrganismOptions,
    DataType, PhenoType, AgentStateType, EnvStateType> {
    constructor(pops: Array<Population<GenType, PopType, OrgType, DataType, PhenoType, AgentStateType, EnvStateType>>) {
    }
}
