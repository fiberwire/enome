import { Genome } from '../genotypes/genome';
import { IGenomeOptions } from '../index';

import * as _ from 'lodash';

export function rgbaColor<T extends IGenomeOptions>(
  genotype: Genome<T>,
  minRed: number = 0, maxRed: number = 255,
  minGreen: number = 0, maxGreen: number = 255,
  minBlue: number = 0, maxBlue: number = 255,
  minAlpha: number = 0, maxAlpha: number = 1
): string {
  const r = genotype.g.float(minRed, maxRed);
  const g = genotype.g.float(minGreen, maxGreen);
  const b = genotype.g.float(minBlue, maxBlue);
  const a = genotype.g.float(minAlpha, maxAlpha);

  return `rgba(${r},${g},${b},${a})`;
}
