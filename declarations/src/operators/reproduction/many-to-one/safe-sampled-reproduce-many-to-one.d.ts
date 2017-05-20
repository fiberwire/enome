import { Evaluation, Genome, GenomeOptions } from '../../../index';
export declare function safeSampledReproduceManyToOne<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T, U>, weights?: number[], sampleSize?: number): Genome<T>;
