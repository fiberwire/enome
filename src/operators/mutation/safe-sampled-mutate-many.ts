import * as _ from 'lodash';
import {
    avgFitness,
    Evaluation,
    Genome,
    GenomeOptions,
    sampledMutateMany
} from '../../index';

export function safeSampledMutateMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    mutateChance: number = 0.05,
    mutateType: string = 'sub',
    sampleSize: number = 5
): Genome<T>[] {
    let result: Genome<T>[] = [];

    while (result.length < genomes.length) {
        result = _.concat(
            result,
            sampledMutateMany(genomes, fitness, mutateChance, mutateType, sampleSize)
                .filter(g => fitness(g).fitness > avgFitness(genomes, fitness))
        )
    }

    return result.slice(0, genomes.length);
}