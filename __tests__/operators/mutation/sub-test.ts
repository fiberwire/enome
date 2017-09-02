import { refill } from '../../../src/index';
import { sub } from '../../../src/operators/mutation/sub';

import { expect } from 'chai';
import 'mocha';
import { mocks } from '../../mocks';

describe('operators', () => {
  describe('mutation', () => {
    let { genome } = mocks();

    beforeEach(() => {
      genome = refill(genome);
    });

    describe('sub', () => {
      it('should mutate a genome by replacing values with randomly generated values', () => {
        const mutant = sub(genome, 1);

        expect(mutant.sequence.length).to.eql(genome.sequence.length);
        expect(mutant.sequence).not.to.deep.equal(genome.sequence);
      });
    });
  });
});
