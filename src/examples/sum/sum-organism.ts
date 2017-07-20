import { Genome, IEvaluation, IStateUpdate, Organism } from "../../index";
import { ISumData } from "./sum-data";
import { ISumEnvState } from "./sum-env-state";
import { ISumGenomeOptions } from "./sum-genome-options";
import { ISumOrganismOptions } from "./sum-organism-options";
import { ISumPopOptions } from "./sum-pop-options";

import * as _ from "lodash";

export class SumOrganism extends
    Organism<ISumGenomeOptions, ISumPopOptions, ISumOrganismOptions, ISumData, number[], ISumEnvState> {

    public createPhenotype(genome: Genome<ISumGenomeOptions>): number[] {
        return _.range(genome.options.length)
            .map((i) => genome.g.int(genome.options.min, genome.options.max));
    }

    public interact(state: IStateUpdate<ISumEnvState>, phenotype: number[]): IStateUpdate<ISumEnvState> {
        return {
            interaction: state.interaction + 1,
            state:
            {
                list: phenotype,
                sum: _.sum(phenotype),
            },
        };
    }

    public observe(env: IStateUpdate<ISumEnvState>): ISumData {
        return env.state;
    }

    public evaluate(
        data: ISumData[],
        genotype: Genome<ISumGenomeOptions>,
        phenotype: number[],
    ): IEvaluation<ISumGenomeOptions, ISumData, number[]> {
        const difference = this.options.target - data[0].sum;
        const fitness = Math.abs(difference);

        return {
            data, fitness, genotype, phenotype,
        };
    }

}
