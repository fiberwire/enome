import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
export declare function reproduceManyToMany<T extends GenomeOptions>(genomes: Genome<T>[], n: number, weights?: number[]): Genome<T>[];
