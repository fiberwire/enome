import * as _ from 'lodash';
import { Evaluation } from '../src/evaluation';
import { Genome } from '../src/genotypes/genome';
import { GenomeOptions } from '../src/options/genome-options';
import { Nucleotide } from '../src/genotypes/nucleotide';
import { replenish } from '../src/operators/replenish';
import { value } from '../src/operators/value';

export interface Mock {
    genome: Genome<GenomeOptions>;
    genomes: Genome<GenomeOptions>[];
    fitness: (g: Genome<GenomeOptions>) => Evaluation<GenomeOptions, number[]>;
    mutateChance: number;
    weights: number[];
}

export function mockGenome(): Genome<GenomeOptions> {
    return new Genome({ genomeLength: 50, nucleotideLength: 1 });
}

export function mockGenomes(): Genome<GenomeOptions>[] {
    return _.range(0, 10).map(i => mockGenome());
}

export function MockCreate<T extends GenomeOptions>(genome: Genome<T>): number[] {
    return genome.nuclei(10).map((n: Nucleotide) => n.float(0, 0.1));
}

export function mockFitness<T extends GenomeOptions>(): (g: Genome<T>) => Evaluation<GenomeOptions, number[]> {
    return (gen: Genome<T>) => {
        let list = MockCreate(replenish(gen));

        return {
            fitness: _.sum(list),
            genome: gen,
            creation: list
        }
    }
}

export function mockMutateChance(): number {
    return 0.5;
}

export function mockWeights(): number[] {
    return _.range(0, 10).map(i => value());
}

export function mocks(): Mock {
    return {
        genome: mockGenome(),
        genomes: mockGenomes(),
        fitness: mockFitness(),
        mutateChance: mockMutateChance(),
        weights: mockWeights()
    }
}