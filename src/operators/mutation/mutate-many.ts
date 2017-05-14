import * as _ from 'lodash';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { mutate } from './mutate';

export function mutateMany<T extends GenomeOptions>(
    genomes: Genome<T>[],
    mutateChance: number = 0.05,
    mutateType: string = 'sub'
): Genome<T>[] {
    return genomes.map(g => mutate(g, mutateChance, mutateType))
}