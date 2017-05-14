import { GenomeOptions } from '../../options/genome-options';
import { Genome } from '../../genotypes/genome';
import { Evaluation } from "../../evaluation";
export declare function safeReproduce<T extends GenomeOptions, U>(gen1: Genome<T>, gen2: Genome<T>, fitness: (gen: Genome<T>) => Evaluation<T, U>, weight1?: number, weight2?: number, mutateChance?: number): Genome<T>;
