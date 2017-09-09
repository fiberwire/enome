import { refill } from '../../src/index';
import { mocks } from '../mocks';

describe('operators', () => {
  let { genome } = mocks();

  describe('replenish', () => {
    it('should return a new genome with replenished genes', () => {
      const n = genome.g;

      expect(genome.genes.length).toEqual(genome.freshGenes.length - 1);

      genome = refill(genome);

      expect(genome.genes.length).toEqual(genome.freshGenes.length);
    });
  });
});
