import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
export declare function sampledReproduceManyToMany<T extends GenomeOptions>(genomes: Genome<T>[], weights: number[], n: number, fitness: (gen: Genome<T>) => Evaluation<T>, sampleSize?: number): Genome<T>[];
