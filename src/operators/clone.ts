import * as _ from 'lodash';
import { Genome } from '../genotypes/genome';
import { IGenomeOptions } from '../options/genome-options';

export function clone<T extends IGenomeOptions>(gen: Genome<T>): Genome<T> {
  return _.cloneDeep(gen);
}
