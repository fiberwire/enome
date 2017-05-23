import { FitnessObjective } from '../../../enums/fitness-objective';
import * as _ from 'lodash';
import {
    avgFitness,
    Evaluation,
    Genome,
    GenomeOptions,
    sampledReproduceManyToMany,
    value
} from '../../../index';

//produces many offspring from many genomes, each group selected from a sample, then returns the best group of offspring
export function safeSampledReproduceManyToMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    sampleSize: number = 5,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
): Genome<T>[] {
    let result: Genome<T>[] = [];
    let avgFit = avgFitness(genomes, fitness);

    switch (objective) {
        case FitnessObjective.maximize:
            while (result.length < n) {
                result = _.concat(
                    result,
                    sampledReproduceManyToMany(genomes, n, fitness, objective, sampleSize, weights)
                        .filter(g => fitness(g).fitness > avgFit)
                )
            }
            break;

        case FitnessObjective.minimize:
            while (result.length < n) {
                result = _.concat(
                    result,
                    sampledReproduceManyToMany(genomes, n, fitness, objective, sampleSize, weights)
                        .filter(g => fitness(g).fitness < avgFit)
                )
            }
            break;
    }

    return result.slice(0, n);
}