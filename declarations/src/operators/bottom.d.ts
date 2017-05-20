import { Evaluation, Genome, GenomeOptions } from '../index';
export declare function bottom<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (genome: Genome<T>) => Evaluation<T, U>, percent?: number): Evaluation<T, U>[];
