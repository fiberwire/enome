import { FitnessObjective } from "../../enums/fitness-objective";
import { Genome } from "../../genotypes/genome";
import { IEvaluation } from "../../interfaces/evaluation";
import { IGenomeOptions } from "../../options/genome-options";
import { best } from "../best";
import { worst } from "../worst";
import { reproduce } from "./reproduce";

export function safeReproduce<T extends IGenomeOptions, U>(
    gen1: Genome<T>,
    gen2: Genome<T>,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    weight1: number = 1,
    weight2: number = 1,
    mutateChance: number = 0.05,
): Genome<T> {
    const offspring = reproduce(gen1, gen2, weight1, weight2, mutateChance);

    switch (objective) {
        case FitnessObjective.maximize:
            return best([gen1, gen2, offspring], fitness).genome;

        case FitnessObjective.minimize:
            return worst([gen1, gen2, offspring], fitness).genome;

        // default:
        //     return best([gen1, gen2, offspring], fitness).genome;
    }
}
