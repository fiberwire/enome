import { FitnessObjective } from "../../enums/fitness-objective";
import { Environment, Genome, IEvaluation, IOrganismOptions, mutate, Organism, Population } from "../../index";
import { ISumAgentState } from "./interfaces/sum-agent-state";
import { ISumData } from "./interfaces/sum-data";
import { ISumEnvState } from "./interfaces/sum-env-state";
import { ISumGenomeOptions } from "./interfaces/sum-genome-options";
import { ISumPopOptions } from "./interfaces/sum-pop-options";
import { SumEnv } from "./sum-environment";
import { SumOrganism } from "./sum-organism";
import { ISumOrganismOptions } from "./sum-organism-options";

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

    public mutate(
        evaluation: IEvaluation<ISumGenomeOptions, ISumData, number[]>,
    ): Genome<ISumGenomeOptions> {
        switch (this.popOptions.objective) {
            case FitnessObjective.minimize:
                if (evaluation.fitness <= this.avgFitness.value) {
                    return mutate(
                        evaluation.genotype,
                        this.popOptions.mutate.mutateChance * .5,
                        this.popOptions.mutate.mutateOp,
                    );
                } else {
                    return mutate(
                        evaluation.genotype,
                        this.popOptions.mutate.mutateChance * .5,
                        this.popOptions.mutate.mutateOp,
                    );
                }

            default:
            case FitnessObjective.maximize:
                if (evaluation.fitness >= this.avgFitness.value) {
                    return mutate(
                        evaluation.genotype,
                        this.popOptions.mutate.mutateChance * .5,
                        this.popOptions.mutate.mutateOp,
                    );
                } else {
                    return mutate(
                        evaluation.genotype,
                        this.popOptions.mutate.mutateChance * .5,
                        this.popOptions.mutate.mutateOp,
                    );
                }
        }
    }

}
