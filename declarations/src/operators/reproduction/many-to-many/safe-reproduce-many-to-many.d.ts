import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { Evaluation } from "evalutation";
export declare function safeReproduceManyToMany<T extends GenomeOptions>(genomes: Genome<T>[], n: number, fitness: (gen: Genome<T>) => Evaluation<T>, weights?: number[]): Genome<T>[];
