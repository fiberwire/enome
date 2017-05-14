import { Evaluation } from '../src/evaluation';
import { Genome } from '../src/genotypes/genome';
import { GenomeOptions } from '../src/options/genome-options';
export interface Mock {
    genome: Genome<GenomeOptions>;
    genomes: Genome<GenomeOptions>[];
    fitness: (g: Genome<GenomeOptions>) => Evaluation<GenomeOptions, number[]>;
    mutateChance: number;
    weights: number[];
}
export declare function mockGenome(): Genome<GenomeOptions>;
export declare function mockGenomes(): Genome<GenomeOptions>[];
export declare function MockCreate<T extends GenomeOptions>(genome: Genome<T>): number[];
export declare function mockFitness<T extends GenomeOptions>(): (g: Genome<T>) => Evaluation<GenomeOptions, number[]>;
export declare function mockMutateChance(): number;
export declare function mockWeights(): number[];
export declare function mocks(): Mock;
