import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
export declare function reproduceManyToMany<T extends GenomeOptions>(genomes: Genome<T>[], weights: number[], n: number): Genome<T>[];
