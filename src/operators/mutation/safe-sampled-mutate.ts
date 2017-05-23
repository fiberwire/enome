import { best } from '../best';
import { Evaluation } from '../../evaluation';
import { FitnessObjective } from '../../enums/fitness-objective';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { MutateOp } from '../../enums/mutate-op';
import { sampledMutate } from './sampled-mutate';
import { worst } from '../worst';

export function safeSampledMutate<T extends GenomeOptions, U>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    sampleSize: number = 5,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub,
): Genome<T> {
    let mutant = sampledMutate(gen, fitness, objective, sampleSize, mutateChance, mutateType);

    switch (objective) {
        case FitnessObjective.maximize:
            return best([gen, mutant], fitness).genome;

        case FitnessObjective.minimize:
            return worst([gen, mutant], fitness).genome;
    }
}