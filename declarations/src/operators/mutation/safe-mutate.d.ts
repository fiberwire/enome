import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
export declare function safeMutate<T extends GenomeOptions>(gen: Genome<T>, mutateChance: number, mutateType: string, fitness: (gen: Genome<T>) => Evaluation<T>): Genome<T>;
