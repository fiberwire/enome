import { Genome, GenomeOptions, Evaluation } from "../index";
export declare function best<T extends GenomeOptions>(genomes: Genome<T>[], fitness: (genome: Genome<T>) => Evaluation<T>): Evaluation<T>;
