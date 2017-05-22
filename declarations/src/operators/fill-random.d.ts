import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';
export declare function fillRandom<T extends GenomeOptions, U>(genomes: Genome<T>[], percent: number): Genome<T>[];
