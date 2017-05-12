import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { Evaluation } from "evalutation";
export declare function safeReproduce<T extends GenomeOptions>(gen1: Genome<T>, gen2: Genome<T>, fitness: (gen: Genome<T>) => Evaluation<T>, weight1?: number, weight2?: number, mutateChance?: number): Genome<T>;
