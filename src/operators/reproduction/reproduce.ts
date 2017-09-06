import { Chance } from 'chance';
import * as _ from 'lodash';
import { MutateOp } from '../../enums/mutate-op';
import { Genome } from '../../genotypes/genome';
import { IGenomeOptions } from '../../options/genome-options';
import { mutate } from '../mutation/mutate';
import { values } from '../values';

const chance = new Chance();

export function reproduce<T extends IGenomeOptions>(
  gen1: Genome<T>,
  gen2: Genome<T>,
  weight1: number = 1,
  weight2: number = 1,
  mutateChance: number = 0.05
): Genome<T> {
  return mutate(
    new Genome<T>(
      gen1.options,
      _.zip(gen1.sequence, gen2.sequence).map((vals: number[]) => {
        // console.log(`w1: ${w1}, w2: ${w2}`);
        const v = chance.weighted(vals, [weight1, weight2]);
        return v;
      })
    ),
    mutateChance,
    MutateOp.avg
  );
}
