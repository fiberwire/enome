import { Evaluation, Genome, GenomeOptions } from '../index';
export declare function top<T extends GenomeOptions, U>(genomes: Genome<T>[], threshold: number, fitness: (genome: Genome<T>) => Evaluation<T, U>): Evaluation<T, U>[];
