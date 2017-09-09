import * as _ from 'lodash';

import { clone, refill } from '../../src/index';
import { mocks } from '../mocks';

describe('operators', () => {
  describe('clone', () => {
    let { genome } = mocks();

    beforeEach(() => {
      genome = refill(genome);
    });

    it('should return an exact copy of the provided genome', () => {
      const c = clone(genome);
      expect(c).toEqual(genome);
    });
  });
});
