import * as _ from 'lodash';
import { best } from '../best';
import { Evaluation } from '../../evaluation';
import { FitnessObjective } from '../../enums/fitness-objective';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { mutate } from './mutate';
import { MutateOp } from '../../enums/mutate-op';
import { worst } from '../worst';

export function sampledMutateMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub,
    sampleSize: number = 5
): Genome<T>[] {

    switch (objective) {
        case FitnessObjective.maximize:
            return genomes.map(g => {
                let sample = _.range(0, sampleSize).map(i => mutate(g, mutateChance, mutateType));
                return best(sample, fitness).genome;
            });

        case FitnessObjective.minimize:
            return genomes.map(g => {
                let sample = _.range(0, sampleSize).map(i => mutate(g, mutateChance, mutateType));
                return worst(sample, fitness).genome;
            });

    }
}