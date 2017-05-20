import { Evaluation, Genome, GenomeOptions } from '../../../index';
export declare function sampledReproduceManyToMany<T extends GenomeOptions, U>(genomes: Genome<T>[], n: number, fitness: (gen: Genome<T>) => Evaluation<T, U>, sampleSize?: number, weights?: number[]): Genome<T>[];
