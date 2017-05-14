import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';
export declare function clone<T extends GenomeOptions>(gen: Genome<T>): Genome<T>;
