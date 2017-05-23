import { Evaluation } from '../../../evaluation';
import { FitnessObjective } from '../../../enums/fitness-objective';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
export declare function safeReproduceManyToMany<T extends GenomeOptions, U>(genomes: Genome<T>[], n: number, fitness: (gen: Genome<T>) => Evaluation<T, U>, objective?: FitnessObjective, weights?: number[]): Genome<T>[];
