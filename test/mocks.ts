
import { replenish } from "operators/replenish";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
import { GenomeOptions } from "options/genome-options";

import * as _ from 'lodash';

export interface Mock{
    genome: Genome<GenomeOptions>,
    fitness: (g: Genome<GenomeOptions>) => Evaluation<GenomeOptions>
}

export function mockGenome(): Genome<GenomeOptions> {
    return new Genome({ genomeLength: 10, nucleotideLength: 1 });
}

export function mockFitness<T extends GenomeOptions>(): (g: Genome<T>) => Evaluation<T> {
    return (g: Genome<T>) => {
        g = replenish(g);
        return {
            fitness: _.sum(g.nuclei(10)),
            genome: g
        }
    }
}

export function mocks(): Mock {
    return {
        genome: mockGenome(),
        fitness: mockFitness()
    }
}