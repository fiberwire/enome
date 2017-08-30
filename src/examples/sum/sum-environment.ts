import { ISumData } from "./interfaces/sum-data";
import { ISumEnvState } from "./interfaces/sum-env-state";
import { ISumGenomeOptions } from "./interfaces/sum-genome-options";
import { ISumOrganismOptions } from "./interfaces/sum-organism-options";
import { ISumPopOptions } from "./interfaces/sum-pop-options";
import { SumOrganism } from "./sum-organism";
import { SumPopulation } from "./sum-population";

import { AgentEnvironment, IAgentEnvironmentOptions, IAgentUpdate, IStateUpdate } from "enviro-rx";
import { Genome, Organism } from "../../index";

export class SumEnv extends AgentEnvironment<ISumEnvState, ISumEnvState> {

    public get defaultState(): ISumEnvState {
        return {
            list: [],
            sum: 0,
        };
    }

    constructor(public options: IAgentEnvironmentOptions) {
        super(options);
    }

    public interact(interaction: IAgentUpdate<ISumEnvState>): Promise<IStateUpdate<ISumEnvState>> {
        return Promise.resolve(interaction);
    }
}
