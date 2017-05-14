import { best } from '../best';
import { Evaluation } from '../../evaluation';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { sampledMutate } from './sampled-mutate';

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