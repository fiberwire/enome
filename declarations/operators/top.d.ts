import { Genome, GenomeOptions, Evaluation } from "../index";
export declare function top<T extends GenomeOptions>(gens: Genome<T>[], cutoff: number, fitness: (genome: Genome<T>) => Evaluation<T>): Evaluation<T>[];
