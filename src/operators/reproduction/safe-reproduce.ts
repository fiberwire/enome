import {
    best,
    Evaluation,
    Genome,
    GenomeOptions,
    reproduce
} from '../../index';

export function safeReproduce<T extends GenomeOptions, U>(
    gen1: Genome<T>,
    gen2: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    weight1: number = 1,
    weight2: number = 1,
    mutateChance: number = 0.05
): Genome<T> {
    let offspring = reproduce(gen1, gen2, weight1, weight2, mutateChance);

    return best([gen1, gen2, offspring], fitness).genome;
}