import { hexColor, rgbaColor } from '../../src/index';
import { mocks } from '../../src/mocks';

const { genome } = mocks();

describe('operators', () => {
  describe('rgbaColor', () => {
    it('should return an rgba color code', () => {
      const color = rgbaColor(genome);
      expect(typeof color).toBe('string');
      expect(color.slice(0, 5)).toEqual('rgba(');
      expect(color.slice(color.length - 1, color.length)).toEqual(')');
    });
  });
});
