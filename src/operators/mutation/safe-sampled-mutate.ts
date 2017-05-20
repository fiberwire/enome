import {
    best,
    Evaluation,
    Genome,
    GenomeOptions,
    sampledMutate
    } from '../../index';

export function safeSampledMutate<T extends GenomeOptions, U>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    sampleSize: number = 5,
    mutateChance: number = 0.05,
    mutateType: string = 'sub',
): Genome<T> {
    let mutant = sampledMutate(gen, fitness, sampleSize, mutateChance, mutateType);

    return best([gen, mutant], fitness).genome;
}