import { Genome, EnomeOptions, Evaluation } from "../index";
export declare function best<T extends EnomeOptions>(gens: Genome<T>[], fitness: (genome: Genome<T>) => Evaluation<T>): Evaluation<T>;
