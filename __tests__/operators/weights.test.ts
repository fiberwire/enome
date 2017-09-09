import { weights } from '../../src/index';

describe('operators', () => {
  describe('values', () => {
    it('Should produce an array of specified length of random values', () => {
      const vals = weights(10);
      expect(vals.length).toEqual(10);
      expect(vals[0]).not.toEqual(vals[1]);
    });
  });
});
