import { Genome, EnomeOptions, Evaluation } from "../index";
export declare function top<T extends EnomeOptions>(gens: Genome<T>[], cutoff: number, fitness: (genome: Genome<T>) => Evaluation<T>): Evaluation<T>[];
