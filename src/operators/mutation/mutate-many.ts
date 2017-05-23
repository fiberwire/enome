import { MutateOp } from '../../enums/mutate-op';
import * as _ from 'lodash';
import { Genome, GenomeOptions, mutate } from '../../index';

export function mutateMany<T extends GenomeOptions>(
    genomes: Genome<T>[],
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub
): Genome<T>[] {
    return genomes.map(g => mutate(g, mutateChance, mutateType))
}