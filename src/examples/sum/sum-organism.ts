import { Genome, IEvaluation, Organism } from "../../index";
import { ISumAgentState } from "./interfaces/sum-agent-state";
import { ISumData } from "./interfaces/sum-data";
import { ISumEnvState } from "./interfaces/sum-env-state";
import { ISumGenomeOptions } from "./interfaces/sum-genome-options";
import { ISumOrganismOptions } from "./interfaces/sum-organism-options";
import { ISumPopOptions } from "./interfaces/sum-pop-options";

import { IAgentUpdate, IInteraction, IStateUpdate } from "enviro-rx";
import * as _ from "lodash";

export class SumOrganism extends
    Organism<ISumGenomeOptions, ISumPopOptions, ISumOrganismOptions, ISumData, number[], ISumAgentState, ISumEnvState> {

    public createPhenotype(genome: Genome<ISumGenomeOptions>): number[] {
        return _.range(genome.options.length)
            .map((i) => genome.g.int(genome.options.min, genome.options.max));
    }

    public interact(
        state: IStateUpdate<ISumEnvState>,
    ): IAgentUpdate<ISumEnvState> {
        // console.log(`interacting: ${this.genotype.id}`);

        return {
            agentID: this.id,
            index: state.index + 1,
            state:
            {
                list: this.phenotype,
                sum: _.sum(this.phenotype),
            },
        };
    }

    public observe(interaction: IInteraction<ISumEnvState, ISumEnvState>): ISumData {
        // console.log(`observing: ${this.genotype.id}`);
        return interaction.newState.state;
    }

    public evaluate(
        data: ISumData[],
        genotype: Genome<ISumGenomeOptions>,
        phenotype: number[],
    ): IEvaluation<ISumGenomeOptions, ISumData, number[]> {
        const difference = this.options.target - data[0].sum;
        const fitness = Math.abs(difference);

        // console.log(`evaluating: ${this.genotype.id}`);

        return {
            data, fitness, genotype, phenotype,
        };
    }

}
