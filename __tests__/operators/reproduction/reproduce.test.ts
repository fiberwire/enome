import {
  Genome,
  IGenomeOptions,
  mutate,
  refill,
  reproduce,
} from '../../../src/index';
import { mocks } from '../../../src/mocks';

describe('operators', () => {
  describe('reproduction', () => {
    describe('reproduce', () => {
      let { genome } = mocks();
      const { mutateChance } = mocks();

      beforeEach(() => {
        genome = refill(genome);
      });

      const mutated: Genome<IGenomeOptions> = mutate(genome, mutateChance);
      const offspring: Genome<IGenomeOptions> = reproduce(genome, mutated);

      it('should produce an offspring genome with genetics from both parents', () => {
        expect(mutated.sequence.length).toEqual(genome.sequence.length);
        expect(offspring.sequence.length).toEqual(mutated.sequence.length);

        expect(genome.sequence).not.toEqual(mutated.sequence);
        expect(genome.sequence).not.toEqual(offspring.sequence);
        expect(mutated.sequence).not.toEqual(offspring.sequence);
      });
    });
  });
});
