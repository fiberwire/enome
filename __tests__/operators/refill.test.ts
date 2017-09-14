import { refill } from '../../src/index';
import { mocks } from '../../src/mocks';

describe('operators', () => {
  let { genome } = mocks();

  describe('refill', () => {
    it('should return a new genome with refilled genes', () => {
      const n = genome.g;

      expect(genome.index).toEqual(1);

      genome = refill(genome);

      expect(genome.index).toEqual(0);
    });
  });
});
