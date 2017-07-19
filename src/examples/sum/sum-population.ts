import { FitnessObjective } from "../../enums/fitness-objective";
import { Environment, Genome, IEvaluation, IOrganismOptions, mutate, Organism, Population } from "../../index";
import { ISumData } from "./sum-data";
import { ISumEnvState } from "./sum-env-state";
import { SumEnv } from "./sum-environment";
import { ISumGenomeOptions } from "./sum-genome-options";
import { SumOrganism } from "./sum-organism";
import { ISumPopOptions } from "./sum-pop-options";

import * as _ from "lodash";

export class SumPopulation extends Population<
    ISumGenomeOptions, ISumPopOptions, ISumData, number[], ISumEnvState> {
    public createOrganism(
        pop: Population<ISumGenomeOptions, ISumPopOptions, ISumData, number[], ISumEnvState>,
        env: Environment<ISumEnvState>,
        genome: Genome<ISumGenomeOptions>,
        options: IOrganismOptions):
        Organism<ISumGenomeOptions, ISumPopOptions, ISumData, number[], ISumEnvState> {
            return new SumOrganism(
                pop.toEvaluate,
                env.state.asObservable(),
                env.interactions,
                new Genome(pop.genOptions),
                options);
    }

    public evaluate(organism: SumOrganism): IEvaluation<SumOrganism, number[]> {
        const difference = this.popOptions.target - organism.data.value[0].sum;
        const fitness = Math.abs(difference);
        return {
            fitness,
            organism,
        };
    }

    public mutate(
        evaluation: IEvaluation<SumOrganism, number[]>,
    ): Genome<ISumGenomeOptions> {
        switch (this.popOptions.objective) {
            case FitnessObjective.minimize:
                if (evaluation.fitness <= this.avgFitness.value) {
                    return mutate(
                        evaluation.organism.genotype.value,
                        this.popOptions.mutate.mutateChance * .5,
                        this.popOptions.mutate.mutateOp,
                    );
                } else {
                    return mutate(
                        evaluation.organism.genotype.value,
                        this.popOptions.mutate.mutateChance * .5,
                        this.popOptions.mutate.mutateOp,
                    );
                }

            default:
            case FitnessObjective.maximize:
                if (evaluation.fitness >= this.avgFitness.value) {
                    return mutate(
                        evaluation.organism.genotype.value,
                        this.popOptions.mutate.mutateChance * .5,
                        this.popOptions.mutate.mutateOp,
                    );
                } else {
                    return mutate(
                        evaluation.organism.genotype.value,
                        this.popOptions.mutate.mutateChance * .5,
                        this.popOptions.mutate.mutateOp,
                    );
                }
        }
    }

}
