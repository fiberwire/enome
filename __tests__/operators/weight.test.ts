import { weight } from '../../src/index';

describe('operators', () => {
  describe('value', () => {
    it('Should produce a random value between 0 and 1', () => {
      const val = weight();

      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(1);
    });
  });
});
