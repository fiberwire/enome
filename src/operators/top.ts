import * as _ from 'lodash';
import {
    Evaluation,
    Genome,
    GenomeOptions,
    Nucleotide
} from '../index';

export function top<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (genome: Genome<T>) => Evaluation<T, U>,
    percent: number = 0.5,
): Evaluation<T, U>[] {
    //sort evaluations of genomes by fitness, descending order
    let t = _.sortBy(genomes.map(fitness), e => e.fitness).reverse();

    //select just the ones that make the cut
    return new Nucleotide(percent).elements(t);
}