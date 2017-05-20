import { Evaluation, Genome, GenomeOptions } from '../../../index';
export declare function safeReproduceManyToMany<T extends GenomeOptions, U>(genomes: Genome<T>[], n: number, fitness: (gen: Genome<T>) => Evaluation<T, U>, weights?: number[]): Genome<T>[];
