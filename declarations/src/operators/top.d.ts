import { Evaluation, Genome, GenomeOptions } from '../index';
export declare function top<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (genome: Genome<T>) => Evaluation<T, U>, percent?: number): Evaluation<T, U>[];
