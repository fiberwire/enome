import { Evaluation } from '../../evaluation';
import { FitnessObjective } from '../../enums/fitness-objective';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { MutateOp } from '../../enums/mutate-op';
export declare function sampledMutate<T extends GenomeOptions, U>(gen: Genome<T>, fitness: (gen: Genome<T>) => Evaluation<T, U>, objective?: FitnessObjective, sampleSize?: number, mutateChance?: number, mutateType?: MutateOp): Genome<T>;
