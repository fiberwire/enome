import { Evaluation } from '../evaluation';
import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';
export declare function top<T extends GenomeOptions, U>(genomes: Genome<T>[], threshold: number, fitness: (genome: Genome<T>) => Evaluation<T, U>): Evaluation<T, U>[];
