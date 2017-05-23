import { ArtificialSelectionOptions } from '../src/options/artificial-selection-options';
import { ArtificialSelection } from '../src/populations/artificial-selection';
import { NaturalSelectionOptions } from '../src/options/natural-selection-options';
import * as _ from 'lodash';
import { Evaluation } from '../src/evaluation';
import { Genome } from '../src/genotypes/genome';
import { GenomeOptions } from '../src/options/genome-options';
import { NaturalSelection } from '../src/populations/natural-selection';
import { Nucleotide } from '../src/genotypes/nucleotide';
import { replenish } from '../src/operators/replenish';
import { value } from '../src/operators/value';

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

export function mockGenome(): Genome<GenomeOptions> {
    return new Genome({
        genomeLength: 50,
        nucleotideLength: 1,
        extendNucleotides: false
    });
}

export function mockGenomes(): Genome<GenomeOptions>[] {
    return _.range(0, 10).map(i => mockGenome());
}

export function mockNSCreate(genome: Genome<GenomeOptions>): number[] {
    return genome.nuclei(10).map((n: Nucleotide) => n.float(0, 0.1));
}

export function mockASCreate(genome: Genome<GenomeOptions>): string[] {
    return genome.nuclei(10).map((n: Nucleotide) => n.letter());
}

export function mockNSFitness(gen: Genome<GenomeOptions>) {
    let list = mockNSCreate(replenish(gen));

    return {
        fitness: _.sum(list),
        genome: gen,
        result: list
    }
}

export function mockMutateChance(): number {
    return 0.5;
}

export function mockWeights(): number[] {
    return _.range(0, 10).map(i => value());
}

export function mockNSOptions(): NaturalSelectionOptions {
    return {
        populationSize: 20,
        fillType: 'random', //either worst or random
        fillPercent: 0.15,
        mutateOptions: {
            safe: false,
            sampled: false,
            sampleSize: 5,
            mutateChance: 0.15,
            mutateType: 'sub' //either sub or avg
        },
        reproduceOptions: {
            safe: true,
            sampled: false,
            sampleSize: 5
        }
    }
}

export function mockASOptions(): ArtificialSelectionOptions {
    return {
        initSize: 10,
        minSize: 5,
        maxSixe: 15,
        mutateOptions: {
            safe: false,
            sampled: false,
            sampleSize: 5,
            mutateChance: 0.15,
            mutateType: 'avg' //either sub or avg
        },
    }
}

export function mockGenomeOptions(): GenomeOptions {
    return {
        genomeLength: 50,
        nucleotideLength: 1,
        extendNucleotides: false
    }
}

export function mockNS(): NaturalSelection<GenomeOptions, NaturalSelectionOptions, number[]> {
    return new NaturalSelection(
        mockNSOptions(),
        mockGenomeOptions(),
        mockNSCreate,
        mockNSFitness
    )
}

export function mockAS(): ArtificialSelection<GenomeOptions, ArtificialSelectionOptions, string[]> {
    return new ArtificialSelection(
        mockASOptions(),
        mockGenomeOptions(),
        mockASCreate
    )
}
export function mocks(): Mock {
    return {
        genome: mockGenome(),
        genomes: mockGenomes(),
        nsFitness: mockNSFitness,
        mutateChance: mockMutateChance(),
        weights: mockWeights(),
        natural: mockNS(),
        nsCreate: mockNSCreate,
        naturalOptions: mockNSOptions(),
        genomeOptions: mockGenomeOptions(),
        artificial: mockAS(),
        asCreate: mockASCreate
    }
}