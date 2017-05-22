import { NaturalSelectionOptions } from '../src/options/natural-selection-options';
import { Evaluation } from '../src/evaluation';
import { Genome } from '../src/genotypes/genome';
import { GenomeOptions } from '../src/options/genome-options';
import { NaturalSelection } from '../src/populations/natural-selection';
export interface Mock {
    genome: Genome<GenomeOptions>;
    genomes: Genome<GenomeOptions>[];
    fitness: (g: Genome<GenomeOptions>) => Evaluation<GenomeOptions, number[]>;
    mutateChance: number;
    weights: number[];
    natural: NaturalSelection<GenomeOptions, NaturalSelectionOptions, number[]>;
    create: (g: Genome<GenomeOptions>) => number[];
    genomeOptions: GenomeOptions;
    naturalOptions: NaturalSelectionOptions;
}
export declare function mockGenome(): Genome<GenomeOptions>;
export declare function mockGenomes(): Genome<GenomeOptions>[];
export declare function mockCreate(genome: Genome<GenomeOptions>): number[];
export declare function mockFitness(gen: Genome<GenomeOptions>): {
    fitness: number;
    genome: Genome<GenomeOptions>;
    result: number[];
};
export declare function mockMutateChance(): number;
export declare function mockWeights(): number[];
export declare function mockNaturalSelectionOptions(): NaturalSelectionOptions;
export declare function mockGenomeOptions(): GenomeOptions;
export declare function mockNaturalSelection(): NaturalSelection<GenomeOptions, NaturalSelectionOptions, number[]>;
export declare function mocks(): Mock;
