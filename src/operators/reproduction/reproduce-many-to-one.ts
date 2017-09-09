import * as Chance from 'chance';
import * as _ from 'lodash';
import { Genome, IGenomeOptions, weight } from '../../index';
const chance = new Chance();

export function reproduceManyToOne<T extends IGenomeOptions>(
  genomes: Array<Genome<T>>,
  weights: number[] = _.range(genomes.length).map(i => weight())
): Genome<T> {
  const offspringSeq: number[] = _.zip(...genomes.map(g => g.sequence)) // [0, 1, 2] and [3, 4, 5] => [[0, 3], [1, 4], [2, 5]], for example
    .map((slice: number[]) => {
      return chance.weighted(slice, weights);
    });

  return new Genome(genomes[0].options, offspringSeq);
}
