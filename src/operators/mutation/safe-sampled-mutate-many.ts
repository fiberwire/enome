import * as _ from "lodash";
import { FitnessObjective } from "../../enums/fitness-objective";
import { MutateOp } from "../../enums/mutate-op";
import { Genome } from "../../genotypes/genome";
import { IEvaluation } from "../../interfaces/evaluation";
import { IGenomeOptions } from "../../options/genome-options";
import { avgFitness } from "../avg-fitness";
import { sampledMutateMany } from "./sampled-mutate-many";

export function safeSampledMutateMany<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub,
    sampleSize: number = 5,
): Array<Genome<T>> {
    let result: Array<Genome<T>> = [];

    switch (objective) {
        case FitnessObjective.maximize:
            while (result.length < genomes.length) {
                result = _.concat(
                    result,
                    sampledMutateMany(genomes, fitness, objective, mutateChance, mutateType, sampleSize)
                        .filter((g) => fitness(g).fitness > avgFitness(genomes, fitness)),
                );
            }

        case FitnessObjective.minimize:
            while (result.length < genomes.length) {
                result = _.concat(
                    result,
                    sampledMutateMany(genomes, fitness, objective, mutateChance, mutateType, sampleSize)
                        .filter((g) => fitness(g).fitness < avgFitness(genomes, fitness)),
                );
            }

    }

    return result.slice(0, genomes.length);
}
