import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
export declare function concat<T extends GenomeOptions>(gen1: Genome<T>, gen2: Genome<T>): Genome<T>;
