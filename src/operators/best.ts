import * as _ from 'lodash';
import { Evaluation, Genome, GenomeOptions } from '../index';

export function best<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (genome: Genome<T>) => Evaluation<T, U>
): Evaluation<T, U> {
    //best genome from genomes, based on fitness
    return _.maxBy(genomes.map(fitness), e => e.fitness);
}