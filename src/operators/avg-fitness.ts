
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "index";

import * as _ from 'lodash';

export function avgFitness<T extends GenomeOptions>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T>
): number {
    return _.meanBy(genomes, g => fitness(g).fitness);
}