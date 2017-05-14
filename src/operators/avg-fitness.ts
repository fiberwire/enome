import * as _ from 'lodash';
import { Evaluation } from '../evaluation';
import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';

export function avgFitness<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>
): number {
    return _.meanBy(genomes, g => fitness(g).fitness);
}