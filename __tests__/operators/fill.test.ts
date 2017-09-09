import { fill, refill } from '../../src/index';

import * as _ from 'lodash';
import { mocks } from '../mocks';

describe('operators', () => {
  describe('fill', () => {
    let { genomes } = mocks();

    beforeEach(() => {
      genomes = genomes.map(refill);
    });

    it('should return a new array of genomes filled with offspring of parents from original array', () => {
      const f = fill(genomes, 20);
      expect(f.length).toEqual(20);
    });
  });
});
