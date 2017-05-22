import * as _ from 'lodash';
import * as Chance from 'chance';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
import { value } from '../../value';
let chance = new Chance();

export function reproduceManyToOne<T extends GenomeOptions>(
    genomes: Genome<T>[],
    weights: number[] = _.range(0, genomes.length).map(i => value())
): Genome<T> {
    let offspringSeq: number[] = _
        .zip(...genomes.map(g => g.sequence)) // [0, 1, 2] and [3, 4, 5] => [[0, 3], [1, 4], [2, 5]], for example
        .map((slice: number[]) => {
            return chance.weighted(slice, weights);
        });

    return new Genome(
        chance.weighted(genomes, weights).options,
        offspringSeq
    );
}