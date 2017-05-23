import { Evaluation, Genome, GenomeOptions } from '../../../index';
import { FitnessObjective } from '../../../enums/fitness-objective';
export declare function sampledReproduceManyToOne<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T, U>, objective?: FitnessObjective, weights?: number[], sampleSize?: number): Genome<T>;
