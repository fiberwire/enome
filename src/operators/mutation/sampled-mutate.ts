import { Evaluation } from '../../interfaces/evaluation';
import * as _ from 'lodash';
import { best } from '../best';
import { FitnessObjective } from '../../enums/fitness-objective';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { mutate } from './mutate';
import { MutateOp } from '../../enums/mutate-op';
import { worst } from '../worst';

//produces a number of mutated genomes, then returns the best one.
export function sampledMutate<T extends GenomeOptions, U>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    sampleSize: number = 5,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub
): Genome<T> {
    let mutants = _.range(0, sampleSize)
        .map(i => mutate(gen, mutateChance, mutateType))

    switch (objective) {
        case FitnessObjective.maximize:
            return best(mutants, fitness).genome;

        case FitnessObjective.minimize:
            return worst(mutants, fitness).genome;
    }
}