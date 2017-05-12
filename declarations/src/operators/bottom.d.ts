import { Evaluation } from "evalutation";
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
export declare function bottom<T extends GenomeOptions>(genomes: Genome<T>[], threshold: number, fitness: (genome: Genome<T>) => Evaluation<T>): Evaluation<T>[];
