import * as _ from 'lodash';
import {
    Evaluation,
    Genome,
    GenomeOptions,
    Nucleotide
} from '../index';

//randomly replaces a percent of genomes (regardless of fitness) with random ones
export function fillRandom<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    percent: number
): Genome<T>[] {
    if (percent > 1 || percent < 0) throw ('percent must be a number between 0 (inclusive) and 1 (inclusive)');

    let removed = new Nucleotide(percent).elements(_.shuffle(genomes));
    let culled = genomes.filter(g => !_.includes(removed, g))
    let random = _.range(removed.length).map(i => new Genome(genomes[0].options));
    let filled = _.concat(culled, random);

    return filled;
}