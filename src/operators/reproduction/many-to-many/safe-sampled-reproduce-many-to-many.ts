import * as _ from "lodash";
import { FitnessObjective } from "../../../enums/fitness-objective";
import {
    avgFitness,
    bottom,
    Genome,
    IEvaluation,
    IGenomeOptions,
    sampledReproduceManyToMany,
    top,
    value,
} from "../../../index";

// produces many offspring from many genomes,
// each group selected from a sample,
// then returns the best group of offspring
export function safeSampledReproduceManyToMany<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    n: number,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    sampleSize: number = 5,
    weights: number[] = _.range(0, genomes.length).map((i) => value()),
): Array<Genome<T>> {
    let result: Array<Genome<T>> = [];
    const avgFit = avgFitness(genomes, fitness);

    switch (objective) {
        case FitnessObjective.maximize:
            result = top(genomes, fitness).map((e) => e.genome);
            while (result.length < n) {
                result = _.concat(
                    result,
                    sampledReproduceManyToMany(genomes, n, fitness, objective, sampleSize, weights)
                        .filter((g) => fitness(g).fitness > avgFit),
                );
            }
            break;

        case FitnessObjective.minimize:
            result = bottom(genomes, fitness).map((e) => e.genome);
            while (result.length < n) {
                result = _.concat(
                    result,
                    sampledReproduceManyToMany(genomes, n, fitness, objective, sampleSize, weights)
                        .filter((g) => fitness(g).fitness < avgFit),
                );
            }
            break;
    }

    return result.slice(0, n);
}
