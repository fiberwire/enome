import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
export declare function safeReproduceManyToOne<T extends GenomeOptions>(gens: Genome<T>[], weights: number[], fitness: (gen: Genome<T>) => Evaluation<T>): Genome<T>;
