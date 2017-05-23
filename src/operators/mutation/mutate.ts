import { MutateOp } from '../../enums/mutate-op';
import {
    avg,
    Genome,
    GenomeOptions,
    sub
    } from '../../index';

export function mutate<T extends GenomeOptions>(
    gen: Genome<T>,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub
): Genome<T> {
    switch (mutateType) {
        case MutateOp.sub:
            return sub(gen, mutateChance);
        case MutateOp.avg:
            return avg(gen, mutateChance);
        default:
            return sub(gen, mutateChance);
    }
}