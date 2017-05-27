import * as _ from "lodash";
import {
    best,
    Genome,
    IEvaluation,
    IGenomeOptions,
    reproduce,
} from "../../index";

export function safeSampledReproduce<T extends IGenomeOptions, U>(
    gen1: Genome<T>,
    gen2: Genome<T>,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    samepleSize: number = 5,
    weight1: number = 1,
    weight2: number = 1,
    mutateChance: number = 0.05,
): Genome<T> {
    const offspring = _.range(0, samepleSize)
        .map((i) => reproduce(gen1, gen2, weight1, weight2, mutateChance));

    return best(_.concat([gen1, gen2], offspring), fitness).genome;
}
