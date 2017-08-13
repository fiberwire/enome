import { FitnessObjective } from "../../src/enums/fitness-objective";
import { IMutateOptions } from "./mutate-options";
import { IReproduceOptions } from "./reproduce-options";

export interface IPopulationOptions {
    generations: number;
    mutate: IMutateOptions;
    objective: FitnessObjective;
    progress: boolean;
    size: number;
    topPercent?: number;
    updateWeights?: {
        randomize: number,
        reproduce: number,
    };
}
