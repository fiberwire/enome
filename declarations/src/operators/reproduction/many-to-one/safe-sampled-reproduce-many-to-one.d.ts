import { Evaluation } from '../../../evaluation';
import { FitnessObjective } from '../../../enums/fitness-objective';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
export declare function safeSampledReproduceManyToOne<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T, U>, objective?: FitnessObjective, weights?: number[], sampleSize?: number): Genome<T>;
