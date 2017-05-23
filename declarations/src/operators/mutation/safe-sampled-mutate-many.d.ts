import { FitnessObjective } from '../../enums/fitness-objective';
import { Evaluation } from '../../evaluation';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { MutateOp } from '../../enums/mutate-op';
export declare function safeSampledMutateMany<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T, U>, objective?: FitnessObjective, mutateChance?: number, mutateType?: MutateOp, sampleSize?: number): Genome<T>[];
