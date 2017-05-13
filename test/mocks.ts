
import { replenish } from "operators/replenish";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
import { GenomeOptions } from "options/genome-options";

import * as _ from 'lodash';
import { value } from "operators/value";

export interface Mock {
    genome: Genome<GenomeOptions>;
    genomes: Genome<GenomeOptions>[];
    fitness: (g: Genome<GenomeOptions>) => Evaluation<GenomeOptions>;
    mutateChance: number;
    weights: number[];
}

export function mockGenome(): Genome<GenomeOptions> {
    return new Genome({ genomeLength: 10, nucleotideLength: 1 });
}

export function mockGenomes(): Genome<GenomeOptions>[] {
    return _.range(0, 10).map(i => mockGenome());
}

export function mockFitness<T extends GenomeOptions>(): (g: Genome<T>) => Evaluation<T> {
    return (gen: Genome<T>) => {
        let g = replenish(gen);
        return {
            fitness: _.sum(g.nuclei(10).map(n => n.float(0, 0.1))),
            genome: gen
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