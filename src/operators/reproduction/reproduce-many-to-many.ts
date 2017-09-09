import * as _ from 'lodash';
import {
  Genome,
  IGenomeOptions,
  reproduceManyToOne,
  weight,
} from '../../index';

export function reproduceManyToMany<T extends IGenomeOptions>(
  genomes: Array<Genome<T>>,
  n: number,
  weights: number[] = _.range(0, genomes.length).map(i => weight())
): Array<Genome<T>> {
  return _.range(0, n).map(i => reproduceManyToOne(genomes, weights));
}
