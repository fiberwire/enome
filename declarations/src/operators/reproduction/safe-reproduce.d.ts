import { Evaluation } from '../../interfaces/evaluation';
import { FitnessObjective } from '../../enums/fitness-objective';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
export declare function safeReproduce<T extends GenomeOptions, U>(gen1: Genome<T>, gen2: Genome<T>, fitness: (gen: Genome<T>) => Evaluation<T, U>, objective?: FitnessObjective, weight1?: number, weight2?: number, mutateChance?: number): Genome<T>;
