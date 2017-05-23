import { ArtificialSelectionOptions } from '../src/options/artificial-selection-options';
import { ArtificialSelection } from '../src/populations/artificial-selection';
import { NaturalSelectionOptions } from '../src/options/natural-selection-options';
import { Evaluation } from '../src/evaluation';
import { Genome } from '../src/genotypes/genome';
import { GenomeOptions } from '../src/options/genome-options';
import { NaturalSelection } from '../src/populations/natural-selection';
export interface Mock {
    genome: Genome<GenomeOptions>;
    genomes: Genome<GenomeOptions>[];
    nsFitness: (g: Genome<GenomeOptions>) => Evaluation<GenomeOptions, number[]>;
    mutateChance: number;
    weights: number[];
    natural: NaturalSelection<GenomeOptions, NaturalSelectionOptions, number[]>;
    nsCreate: (g: Genome<GenomeOptions>) => number[];
    genomeOptions: GenomeOptions;
    naturalOptions: NaturalSelectionOptions;
    artificial: ArtificialSelection<GenomeOptions, ArtificialSelectionOptions, string[]>;
    asCreate: (g: Genome<GenomeOptions>) => string[];
}
export declare function mockGenome(): Genome<GenomeOptions>;
export declare function mockGenomes(): Genome<GenomeOptions>[];
export declare function mockNSCreate(genome: Genome<GenomeOptions>): number[];
export declare function mockASCreate(genome: Genome<GenomeOptions>): string[];
export declare function mockNSFitness(gen: Genome<GenomeOptions>): {
    fitness: number;
    genome: Genome<GenomeOptions>;
    result: number[];
};
export declare function mockMutateChance(): number;
export declare function mockWeights(): number[];
export declare function mockNSOptions(): NaturalSelectionOptions;
export declare function mockASOptions(): ArtificialSelectionOptions;
export declare function mockGenomeOptions(): GenomeOptions;
export declare function mockNS(): NaturalSelection<GenomeOptions, NaturalSelectionOptions, number[]>;
export declare function mockAS(): ArtificialSelection<GenomeOptions, ArtificialSelectionOptions, string[]>;
export declare function mocks(): Mock;
