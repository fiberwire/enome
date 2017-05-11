import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
export declare function clone<T extends GenomeOptions>(gen: Genome<T>): Genome<T>;
