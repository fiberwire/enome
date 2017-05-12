import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
export declare function worst<T extends GenomeOptions>(genomes: Genome<T>[], fitness: (genome: Genome<T>) => Evaluation<T>): Evaluation<T>;
