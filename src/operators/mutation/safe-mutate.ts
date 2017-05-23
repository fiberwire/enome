import { Evaluation } from '../../interfaces/evaluation';
import { best } from '../best';
import { FitnessObjective } from '../../enums/fitness-objective';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { mutate } from './mutate';
import { MutateOp } from '../../enums/mutate-op';
import { worst } from '../worst';

//returns a mutated genome unless the original genome is more fit, in which case, it returns the original genome
export function safeMutate<T extends GenomeOptions, U>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub
): Genome<T> {
    let mutant = mutate(gen, mutateChance, mutateType);

    switch (objective) {
        case FitnessObjective.maximize:
            return best([gen, mutant], fitness).genome;

        case FitnessObjective.minimize:
            return worst([gen, mutant], fitness).genome;
    }

}