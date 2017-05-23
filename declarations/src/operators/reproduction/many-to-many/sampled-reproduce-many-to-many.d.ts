import { Evaluation, Genome, GenomeOptions } from '../../../index';
import { FitnessObjective } from '../../../enums/fitness-objective';
export declare function sampledReproduceManyToMany<T extends GenomeOptions, U>(genomes: Genome<T>[], n: number, fitness: (gen: Genome<T>) => Evaluation<T, U>, objective?: FitnessObjective, sampleSize?: number, weights?: number[]): Genome<T>[];
