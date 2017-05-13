import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
export declare function safeSampledReproduceManyToOne<T extends GenomeOptions>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T>, weights?: number[], sampleSize?: number): Genome<T>;
