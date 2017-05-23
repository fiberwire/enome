import * as _ from 'lodash';
import { best } from '../best';
import { Evaluation } from '../../evaluation';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { mutate } from './mutate';
import { MutateType } from '../../enums/mutate-type';

export function sampledMutateMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    mutateChance: number = 0.05,
    mutateType: MutateType = MutateType.sub,
    sampleSize: number = 5
): Genome<T>[] {
    return genomes.map(g => {
        let sample = _.range(0, sampleSize).map(i => mutate(g, mutateChance, mutateType));
        return best(sample, fitness).genome;
    });
}