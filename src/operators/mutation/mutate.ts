import {
    avg,
    Genome,
    GenomeOptions,
    sub
    } from '../../index';

export function mutate<T extends GenomeOptions>(
    gen: Genome<T>,
    mutateChance: number = 0.05,
    mutateType: string = 'sub'
): Genome<T> {
    switch (mutateType) {
        case 'sub':
            return sub(gen, mutateChance);
        case 'avg':
            return avg(gen, mutateChance);
        default:
            return sub(gen, mutateChance);
    }
}