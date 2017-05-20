import * as _ from 'lodash';
import {
    best,
    Evaluation,
    Genome,
    GenomeOptions,
    mutate
} from '../../index';

export function sampledMutateMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    mutateChance: number = 0.05,
    mutateType: string = 'sub',
    sampleSize: number = 5
): Genome<T>[] {
    return genomes.map(g => {
        let sample = _.range(0, sampleSize).map(i => mutate(g, mutateChance, mutateType));
        return best(sample, fitness).genome;
    });
}