import * as _ from 'lodash';
import {
    Genome,
    GenomeOptions,
    reproduceManyToOne,
    value
} from '../../../index';

export function reproduceManyToMany<T extends GenomeOptions>(
    genomes: Genome<T>[],
    n: number,
    weights: number[] = _.range(0, genomes.length).map(i => value())
): Genome<T>[] {
    return _.range(0, n)
        .map(i => reproduceManyToOne(genomes, weights));
}