import { Population } from "../../index";
import { ISumData } from "./sum-data";
import { ISumEnvState } from "./sum-env-state";
import { SumEnv } from "./sum-environment";
import { ISumGenomeOptions } from "./sum-genome-options";
import { ISumPopOptions } from "./sum-pop-options";

export class SumPopulation extends Population<
ISumGenomeOptions, ISumPopOptions, ISumData, number[], ISumEnvState> {

    public evaluate(organism: Organism<ISumGenomeOptions, ISumPopOptions, ISumData, number[], ISumEnvState>): IEvaluation<Organism<ISumGenomeOptions, ISumPopOptions, ISumData, number[], ISumEnvState>, number[]> {
        throw new Error("Method not implemented.");
    }
    public mutateOrganism(evaluation: IEvaluation<Organism<ISumGenomeOptions, ISumPopOptions, ISumData, number[], ISumEnvState>, number[]>): Genome<ISumGenomeOptions> {
        throw new Error("Method not implemented.");
    }
    public createEnvironment(): SumEnv {
        return new SumEnv();
    }

}
