import { Genome, GenomeOptions, Evaluation } from "../index";
export declare function top<T extends GenomeOptions>(gens: Genome<T>[], threshold: number, fitness: (genome: Genome<T>) => Evaluation<T>): Evaluation<T>[];
