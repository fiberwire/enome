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
    fitness: (g: Genome<GenomeOptions>) => Evaluation<GenomeOptions, number[]>;
    mutateChance: number;
    weights: number[];
    natural: NaturalSelection<GenomeOptions, NaturalSelectionOptions, number[]>;
    create: (g: Genome<GenomeOptions>) => number[];
    genomeOptions: GenomeOptions;
    naturalOptions: NaturalSelectionOptions;
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

export function mockCreate(genome: Genome<GenomeOptions>): number[] {
    return genome.nuclei(10).map((n: Nucleotide) => n.float(0, 0.1));
}

export function mockFitness(gen: Genome<GenomeOptions>) {
    let list = mockCreate(replenish(gen));

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

export function mockNaturalSelectionOptions(): NaturalSelectionOptions {
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

export function mockGenomeOptions(): GenomeOptions {
    return {
        genomeLength: 50,
        nucleotideLength: 1,
        extendNucleotides: false
    }
}

export function mockNaturalSelection(): NaturalSelection<GenomeOptions, NaturalSelectionOptions, number[]> {
    return new NaturalSelection(
        mockNaturalSelectionOptions(),
        mockGenomeOptions(),
        mockCreate,
        mockFitness
    )
}

export function mocks(): Mock {
    return {
        genome: mockGenome(),
        genomes: mockGenomes(),
        fitness: mockFitness,
        mutateChance: mockMutateChance(),
        weights: mockWeights(),
        natural: mockNaturalSelection(),
        create: mockCreate,
        naturalOptions: mockNaturalSelectionOptions(),
        genomeOptions: mockGenomeOptions()
    }
}