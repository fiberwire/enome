import { FitnessObjective } from "../../enums/fitness-objective";
import { Genome, IEvaluation, IOrganismOptions, mutate, Organism, Population } from "../../index";
import { ISumAgentState } from "./interfaces/sum-agent-state";
import { ISumData } from "./interfaces/sum-data";
import { ISumEnvState } from "./interfaces/sum-env-state";
import { ISumGenomeOptions } from "./interfaces/sum-genome-options";
import { ISumOrganismOptions } from "./interfaces/sum-organism-options";
import { ISumPopOptions } from "./interfaces/sum-pop-options";
import { SumEnv } from "./sum-environment";
import { SumOrganism } from "./sum-organism";

import * as _ from "lodash";

export class SumPopulation extends Population<
    ISumGenomeOptions, ISumPopOptions, ISumOrganismOptions, ISumData, number[], ISumAgentState, ISumEnvState> {
    public createOrganism(
        genome: Genome<ISumGenomeOptions>,
        options: ISumOrganismOptions):
        Organism<ISumGenomeOptions, ISumPopOptions, ISumOrganismOptions,
        ISumData, number[], ISumAgentState, ISumEnvState> {
        return new SumOrganism(genome, options);
    }
}
