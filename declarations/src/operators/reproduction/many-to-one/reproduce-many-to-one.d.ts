import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
export declare function reproduceManyToOne<T extends GenomeOptions>(genomes: Genome<T>[], weights: number[]): Genome<T>;
