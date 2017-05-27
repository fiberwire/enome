import * as _ from "lodash";
import { FitnessObjective } from "../../enums/fitness-objective";
import { MutateOp } from "../../enums/mutate-op";
import {
    avgFitness,
    Genome,
    IEvaluation,
    IGenomeOptions,
    mutateMany,
} from "../../index";

export function safeMutateMany<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub,
): Array<Genome<T>> {
    let result: Array<Genome<T>> = [];

    switch (objective) {
        case FitnessObjective.maximize:
            while (result.length < genomes.length) {
                result = _.concat(
                    result,
                    mutateMany(genomes, mutateChance, mutateType)
                        .filter((g) => fitness(g).fitness > avgFitness(genomes, fitness)),
                );
            }
        case FitnessObjective.minimize:
            while (result.length < genomes.length) {
                result = _.concat(
                    result,
                    mutateMany(genomes, mutateChance, mutateType)
                        .filter((g) => fitness(g).fitness < avgFitness(genomes, fitness)),
                );
            }

    }

    return result.slice(0, genomes.length);
}
