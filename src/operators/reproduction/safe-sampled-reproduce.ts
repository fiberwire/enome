import * as _ from 'lodash';
import { best } from '../best';
import { Evaluation } from '../../evaluation';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { reproduce } from './reproduce';

export function safeSampledReproduce<T extends GenomeOptions, U>(
    gen1: Genome<T>,
    gen2: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    samepleSize: number = 5,
    weight1: number = 1,
    weight2: number = 1,
    mutateChance: number = 0.05
): Genome<T> {
    let offspring = _.range(0, samepleSize)
        .map(i => reproduce(gen1, gen2, weight1, weight2, mutateChance));

    return best(_.concat([gen1, gen2], offspring), fitness).genome;
}