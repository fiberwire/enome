import { Genome, IGenomeOptions, mutate, refill } from '../../../src/index';
import { mocks } from '../../mocks';

describe('operators', () => {
  describe('mutation', () => {
    describe('mutate', () => {
      let { genome } = mocks();

      beforeEach(() => {
        genome = refill(genome);
      });

      it('should mutate the genome, given a certain mutation chance (per value in sequence)', () => {
        const mutated: Genome<IGenomeOptions> = mutate(genome, 0.5);
        expect(mutated.sequence).not.toEqual(genome.sequence);
        expect(mutated.sequence.length).toEqual(genome.sequence.length);
      });
    });
  });
});
