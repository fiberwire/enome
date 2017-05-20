import { Evaluation, Genome, GenomeOptions } from '../index';
export declare function best<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (genome: Genome<T>) => Evaluation<T, U>): Evaluation<T, U>;
