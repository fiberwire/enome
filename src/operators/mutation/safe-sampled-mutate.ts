import { MutateType } from '../../enums/mutate-type';
import { GenomeOptions } from '../../options/genome-options';
import { Genome } from '../../genotypes/genome';
import { Evaluation } from '../../evaluation';
import { sampledMutate } from './sampled-mutate';
import { best } from '../best';

export function safeSampledMutate<T extends GenomeOptions, U>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    sampleSize: number = 5,
    mutateChance: number = 0.05,
    mutateType: MutateType = MutateType.sub,
): Genome<T> {
    let mutant = sampledMutate(gen, fitness, sampleSize, mutateChance, mutateType);

    return best([gen, mutant], fitness).genome;
}