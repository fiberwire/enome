import { Chance } from 'chance';
import * as _ from 'lodash';
import { Genome, IGenomeOptions, mutate, MutateOp } from '../../index';

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
        const v = chance.weighted(vals, [weight1, weight2]);
        return v;
      })
    ),
    mutateChance,
    MutateOp.avg
  );
}
