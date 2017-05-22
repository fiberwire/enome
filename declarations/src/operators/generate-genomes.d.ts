import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';
export declare function generateGenomes<T extends GenomeOptions>(n: number, options: T): Genome<T>[];
