import * as _ from 'lodash';
import { Evaluation, Genome, GenomeOptions } from '../index';

export function avgFitness<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>
): number {
    return _.meanBy(genomes, g => fitness(g).fitness);
}