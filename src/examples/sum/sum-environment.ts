import { ISumData } from "./sum-data";
import { ISumEnvState } from "./sum-env-state";
import { ISumGenomeOptions } from "./sum-genome-options";
import { SumOrganism } from "./sum-organism";
import { ISumPopOptions } from "./sum-pop-options";
import { SumPopulation } from "./sum-population";

import { Environment, Genome, Organism } from "../../index";

export class SumEnv extends Environment<ISumGenomeOptions, ISumPopOptions, ISumData, number[], ISumEnvState> {
    public get initialState(): ISumEnvState {
        return {
            list: [],
            sum: 0,
        };
    }

    constructor(public pop: SumPopulation) {
        super(pop);
    }

    public createOrganism(): SumOrganism {
        return new SumOrganism(this.pop, this, new Genome(this.pop.genOptions), 1);
    }

}
