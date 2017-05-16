import { Evaluation } from '../evaluation';
import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';
export declare function bottom<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (genome: Genome<T>) => Evaluation<T, U>, percent?: number): Evaluation<T, U>[];
