import * as _ from 'lodash';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
import { reproduceManyToOne } from '../many-to-one/reproduce-many-to-one';
import { value } from '../../value';

export function reproduceManyToMany<T extends GenomeOptions>(
    genomes: Genome<T>[],
    n: number,
    weights: number[] = _.range(0, genomes.length).map(i => value())
): Genome<T>[] {
    return _.range(0, n)
        .map(i => reproduceManyToOne(genomes, weights));
}