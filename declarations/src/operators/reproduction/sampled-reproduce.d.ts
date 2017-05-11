import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "index";
export declare function sampledReproduce<T extends GenomeOptions>(gen1: Genome<T>, gen2: Genome<T>, fitness: (gen: Genome<T>) => Evaluation<T>, samepleSize?: number, weight1?: number, weight2?: number, mutateChance?: number): Genome<T>;
