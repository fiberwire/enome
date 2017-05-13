import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
export declare function safeSampledReproduceManyToOne<T extends GenomeOptions>(genomes: Genome<T>[], weights: number[], fitness: (gen: Genome<T>) => Evaluation<T>, sampleSize?: number): Genome<T>;
