import { Genome } from '../genotypes/genome';
import { IGenomeOptions } from '../index';

import * as _ from 'lodash';

export function hexColor<T extends IGenomeOptions>(
  genotype: Genome<T>
): string {
  const hex = _.range(6)
    .map(i => genotype.g.hex())
    .reduce((p, c) => `${p}${c}`);

  return `#${hex}`;
}
