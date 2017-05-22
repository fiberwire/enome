import * as _ from 'lodash';
import { Chance } from 'chance';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { mutate } from '../mutation/mutate';
import { values } from '../values';

const chance = new Chance();

export function reproduce<T extends GenomeOptions>(
    gen1: Genome<T>,
    gen2: Genome<T>,
    weight1: number = 1,
    weight2: number = 1,
    mutateChance: number = 0.05
): Genome<T> {
    return mutate(
        new Genome<T>(
            gen1.options,
            _.zip(gen1.sequence, gen2.sequence)
                .map((values: number[]) => {
                    //console.log(`w1: ${w1}, w2: ${w2}`);
                    let v = chance.weighted(values, [weight1, weight2]);
                    return v;
                })),
        mutateChance, 'avg');
}