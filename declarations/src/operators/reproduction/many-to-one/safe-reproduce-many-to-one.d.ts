import { Evaluation } from '../../../interfaces/evaluation';
import { FitnessObjective } from '../../../enums/fitness-objective';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
export declare function safeReproduceManyToOne<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (genome: Genome<T>) => Evaluation<T, U>, objective?: FitnessObjective, weights?: number[]): Genome<T>;
