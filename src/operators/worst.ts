import * as _ from 'lodash';
import { Evaluation } from '../evaluation';
import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';

export function worst<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (genome: Genome<T>) => Evaluation<T, U>
): Evaluation<T, U> {
    return _.minBy(genomes.map(fitness), e => e.fitness);
}