import * as _ from 'lodash';
import { weight } from '../index';

// returns n random values between min and max
export function weights(n: number, min: number = 0, max: number = 1): number[] {
  return _.range(n).map(i => weight(min, max));
}
