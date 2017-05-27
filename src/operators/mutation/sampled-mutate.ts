import * as _ from "lodash";
import { FitnessObjective } from "../../enums/fitness-objective";
import { MutateOp } from "../../enums/mutate-op";
import { Genome } from "../../genotypes/genome";
import { IEvaluation } from "../../interfaces/evaluation";
import { IGenomeOptions } from "../../options/genome-options";
import { best } from "../best";
import { worst } from "../worst";
import { mutate } from "./mutate";

// produces a number of mutated genomes, then returns the best one.
export function sampledMutate<T extends IGenomeOptions, U>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    sampleSize: number = 5,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub,
): Genome<T> {
    const mutants = _.range(0, sampleSize)
        .map((i) => mutate(gen, mutateChance, mutateType));

    switch (objective) {
        case FitnessObjective.maximize:
            return best(mutants, fitness).genome;

        case FitnessObjective.minimize:
            return worst(mutants, fitness).genome;
    }
}
