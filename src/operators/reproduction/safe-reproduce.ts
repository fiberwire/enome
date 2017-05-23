import { best } from '../best';
import { Evaluation } from '../../evaluation';
import { FitnessObjective } from '../../enums/fitness-objective';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { reproduce } from './reproduce';
import { worst } from '../worst';

export function safeReproduce<T extends GenomeOptions, U>(
    gen1: Genome<T>,
    gen2: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    weight1: number = 1,
    weight2: number = 1,
    mutateChance: number = 0.05
): Genome<T> {
    let offspring = reproduce(gen1, gen2, weight1, weight2, mutateChance);

    switch (objective) {
        case FitnessObjective.maximize:
            return best([gen1, gen2, offspring], fitness).genome;

        case FitnessObjective.minimize:
            return worst([gen1, gen2, offspring], fitness).genome;

        // default:
        //     return best([gen1, gen2, offspring], fitness).genome;
    }
}