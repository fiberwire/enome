import { ISumData } from "./sum-data";
import { ISumEnvState } from "./sum-env-state";
import { ISumGenomeOptions } from "./sum-genome-options";
import { SumOrganism } from "./sum-organism";
import { ISumOrganismOptions } from "./sum-organism-options";
import { ISumPopOptions } from "./sum-pop-options";
import { SumPopulation } from "./sum-population";

import { Environment, Genome, IEnvironmentOptions, IStateUpdate, Organism } from "../../index";

export class SumEnv extends Environment<
    ISumGenomeOptions,
    ISumPopOptions,
    ISumOrganismOptions,
    ISumData, number[], ISumEnvState, ISumEnvState> {
    public get initialState(): IStateUpdate<ISumEnvState> {
        return {
            interaction: 0,
            state: {
                list: [],
                sum: 0,
            },
        };
    }

    constructor(public options: IEnvironmentOptions) {
        super(options);
    }
}
