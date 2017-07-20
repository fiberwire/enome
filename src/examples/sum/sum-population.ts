import { FitnessObjective } from "../../enums/fitness-objective";
import { Environment, Genome, IEvaluation, IOrganismOptions, mutate, Organism, Population } from "../../index";
import { ISumData } from "./sum-data";
import { ISumEnvState } from "./sum-env-state";
import { SumEnv } from "./sum-environment";
import { ISumGenomeOptions } from "./sum-genome-options";
import { SumOrganism } from "./sum-organism";
import { ISumOrganismOptions } from "./sum-organism-options";
import { ISumPopOptions } from "./sum-pop-options";

import * as _ from "lodash";

export class SumPopulation extends Population<
    ISumGenomeOptions, ISumPopOptions, ISumOrganismOptions, ISumData, number[], ISumEnvState> {
    public createOrganism(
        pop: Population<ISumGenomeOptions, ISumPopOptions, ISumOrganismOptions, ISumData, number[], ISumEnvState>,
        env: Environment<ISumEnvState>,
        genome: Genome<ISumGenomeOptions>,
        options: ISumOrganismOptions):
        Organism<ISumGenomeOptions, ISumPopOptions, ISumOrganismOptions, ISumData, number[], ISumEnvState> {
        return new SumOrganism(new Genome(pop.genOptions), options);
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
