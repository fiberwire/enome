import { FitnessObjective } from '../../enums/fitness-objective';
import { MutateOp } from '../../enums/mutate-op';
import { Evaluation, Genome, GenomeOptions } from '../../index';
export declare function safeMutateMany<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T, U>, objective?: FitnessObjective, mutateChance?: number, mutateType?: MutateOp): Genome<T>[];
