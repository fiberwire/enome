import { reverseLerp } from '../../src/index';

describe('operators', () => {
  describe('reverseLerp', () => {
    it('should reverse a linear interpolation between two values', () => {
      const a = 0;
      const b = 10;
      const c = 5;

      const t = reverseLerp(a, b, c);

      expect(t).toEqual(0.5);
    });
  });
});
