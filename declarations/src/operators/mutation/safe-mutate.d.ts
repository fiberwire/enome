import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
export declare function safeMutate<T extends GenomeOptions>(gen: Genome<T>, fitness: (gen: Genome<T>) => Evaluation<T>, mutateChance?: number, mutateType?: string): Genome<T>;
