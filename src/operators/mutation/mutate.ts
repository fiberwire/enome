import { MutateType } from '../../enums/mutate-type';
import {
    avg,
    Genome,
    GenomeOptions,
    sub
    } from '../../index';

export function mutate<T extends GenomeOptions>(
    gen: Genome<T>,
    mutateChance: number = 0.05,
    mutateType: MutateType = MutateType.sub
): Genome<T> {
    switch (mutateType) {
        case MutateType.sub:
            return sub(gen, mutateChance);
        case MutateType.avg:
            return avg(gen, mutateChance);
        default:
            return sub(gen, mutateChance);
    }
}