import { FitnessObjective } from '../../../enums/fitness-objective';
import { Evaluation, Genome, GenomeOptions } from '../../../index';
export declare function safeSampledReproduceManyToMany<T extends GenomeOptions, U>(genomes: Genome<T>[], n: number, fitness: (gen: Genome<T>) => Evaluation<T, U>, objective?: FitnessObjective, sampleSize?: number, weights?: number[]): Genome<T>[];
