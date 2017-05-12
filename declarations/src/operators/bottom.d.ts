import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
export declare function bottom<T extends GenomeOptions>(genomes: Genome<T>[], threshold: number, fitness: (genome: Genome<T>) => Evaluation<T>): Evaluation<T>[];
