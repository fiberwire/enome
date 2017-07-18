import { FitnessObjective } from "../../src/enums/fitness-objective";
import { IMutateOptions } from "./mutate-options";
import { IReproduceOptions } from "./reproduce-options";

export interface IPopulationOptions {
    size: number;
    generations: number;
    mutate: IMutateOptions;
    objective: FitnessObjective;
    weights: {
        mutate: number,
        reproduce: number,
        randomize: number,
    };
}
