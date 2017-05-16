import * as _ from 'lodash';
import {
    best,
    bottom,
    Evaluation,
    Genome,
    GenomeOptions,
    Nucleotide,
    top
} from '../index';


//replaces the worst genomes with random ones
export function fillWorst<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    percent: number
): Genome<T>[] {
    if (percent > 1 || percent < 0) throw ('percent must be a decimal between (0, 1)');

    let removed = bottom(genomes, fitness, percent).map(e => e.genome);
    let culled = genomes.filter(g => !_.includes(removed, g))
    let random = _.range(removed.length).map(i => new Genome<T>(genomes[0].options));
    let filled = _.concat(culled, random);
    return filled;
}