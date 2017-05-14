import { best } from '../best';
import { Evaluation } from '../../evaluation';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { mutate } from './mutate';

//returns a mutated genome unless the original genome is more fit, in which case, it returns the original genome
export function safeMutate<T extends GenomeOptions, U>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    mutateChance: number = 0.05,
    mutateType: string = 'sub'
): Genome<T> {
    let mutant = mutate(gen, mutateChance, mutateType);

    return best([gen, mutant], fitness).genome;
}