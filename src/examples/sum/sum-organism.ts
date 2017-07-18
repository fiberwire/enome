import { Genome, IStateUpdate, Organism } from "../../index";
import { ISumData } from "./sum-data";
import { ISumEnvState } from "./sum-env-state";
import { ISumGenomeOptions } from "./sum-genome-options";
import { ISumPopOptions } from "./sum-pop-options";

import * as _ from "lodash";

export class SumOrganism extends Organism<ISumGenomeOptions, ISumPopOptions, ISumData, number[], ISumEnvState> {
    public observe(env: IStateUpdate<ISumEnvState>): ISumData {
        return env.state;
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
    public createPhenotype(genome: Genome<ISumGenomeOptions>): number[] {
        return _.range(genome.options.length)
            .map((i) => genome.g.int(genome.options.min, genome.options.max));
    }

}
