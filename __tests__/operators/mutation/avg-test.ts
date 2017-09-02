import { expect } from 'chai';
import 'mocha';
import { avg, refill } from '../../../src/index';
import { mocks } from '../../mocks';

describe('operators', () => {
  describe('mutation', () => {
    let { genome } = mocks();

    beforeEach(() => {
      genome = refill(genome);
    });

    describe('avg', () => {
      it('should mutate a genome by averaging mutated values with randomly generated values', () => {
        const mutant = avg(genome, 1);

        expect(mutant.sequence.length).to.eql(genome.sequence.length);
        expect(mutant.sequence).not.to.deep.equal(genome.sequence);
      });
    });
  });
});
