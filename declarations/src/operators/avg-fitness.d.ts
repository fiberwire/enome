import { Evaluation, Genome, GenomeOptions } from '../index';
export declare function avgFitness<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T, U>): number;
