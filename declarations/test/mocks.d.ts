import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
import { GenomeOptions } from "options/genome-options";
export interface Mock {
    genome: Genome<GenomeOptions>;
    genomes: Genome<GenomeOptions>[];
    fitness: (g: Genome<GenomeOptions>) => Evaluation<GenomeOptions>;
    mutateChance: number;
}
export declare function mockGenome(): Genome<GenomeOptions>;
export declare function mockGenomes(): Genome<GenomeOptions>[];
export declare function mockFitness<T extends GenomeOptions>(): (g: Genome<T>) => Evaluation<T>;
export declare function mockMutateChance(): number;
export declare function mocks(): Mock;
