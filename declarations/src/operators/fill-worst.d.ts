import { Evaluation, Genome, GenomeOptions } from '../index';
export declare function fillWorst<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T, U>, percent: number): Genome<T>[];
