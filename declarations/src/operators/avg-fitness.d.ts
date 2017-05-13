import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "index";
export declare function avgFitness<T extends GenomeOptions>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T>): number;
