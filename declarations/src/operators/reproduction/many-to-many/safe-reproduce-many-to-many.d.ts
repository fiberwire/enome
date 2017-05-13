import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { Evaluation } from "evalutation";
export declare function safeReproduceManyToMany<T extends GenomeOptions>(genomes: Genome<T>[], weights: number[], n: number, fitness: (gen: Genome<T>) => Evaluation<T>): Genome<T>[];
