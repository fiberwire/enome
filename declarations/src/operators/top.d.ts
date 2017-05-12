import { Genome, GenomeOptions, Evaluation } from "../index";
export declare function top<T extends GenomeOptions>(genomes: Genome<T>[], threshold: number, fitness: (genome: Genome<T>) => Evaluation<T>): Evaluation<T>[];
