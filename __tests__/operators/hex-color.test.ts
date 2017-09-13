import { hexColor } from "../../src/index";
import { mocks } from "../../src/mocks";


const { genome } = mocks();

describe('operators', () => {
  describe('hexColor', () => {
    it('should return a 6-digit hexidecimal color code', () => {
      const color = hexColor(genome);
      expect(typeof color).toBe('string');
      expect(color.length).toBe(7);
    })
  })
})
