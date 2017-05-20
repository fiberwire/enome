import * as _ from 'lodash';
import {
    best,
    Evaluation,
    Genome,
    GenomeOptions,
    mutate
} from '../../index';

//produces a number of mutated genomes, then returns the best one.
export function sampledMutate<T extends GenomeOptions, U>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    sampleSize: number = 5,
    mutateChance: number = 0.05,
    mutateType: string = 'sub'
): Genome<T> {
    let mutants = _.range(0, sampleSize)
        .map(i => mutate(gen, mutateChance, mutateType))

    return best(mutants, fitness).genome;
}