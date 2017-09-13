import { Gene, lerp, refill } from '../../src/index';
import { mocks } from '../../src/mocks';

describe('genotypes', () => {
  let { genome } = mocks();

  beforeEach(() => {
    genome = refill(genome);
  });

  describe('gene', () => {
    describe('lerp', () => {
      it('should interpolate between a min and max value', () => {
        const lerped = lerp(0, 10, 0.5);

        expect(lerped).toEqual(5);
      });
    });

    describe('float', () => {
      it('should produce a float between min and max', () => {
        const g = genome.g;
        const f = g.float(0, 1);

        expect(g.value).toBeGreaterThanOrEqual(0);
        expect(g.value).toBeLessThanOrEqual(1);

        expect(f).toBeGreaterThanOrEqual(0);
        expect(f).toBeLessThanOrEqual(1);
      });
    });

    describe('int', () => {
      it('should produce an int between min and max', () => {
        const i = genome.g.int(1, 10);
        expect(i).toBeGreaterThanOrEqual(1);
        expect(i).toBeLessThanOrEqual(10);
        expect(i % 1).toBe(0);
      });
    });

    describe('natural', () => {
      it('should produce a natural number between 0 and max', () => {
        const n = genome.g.natural(-1, 10);
        expect(n).toBeGreaterThanOrEqual(0);
        expect(n).toBeLessThanOrEqual(10);
        expect(n % 1).toBe(0);
      });
    });

    describe('bool', () => {
      it('should produce a boolean', () => {
        const bool = genome.g.bool();
        expect([true, false]).toContain(bool);
      });
    });

    describe('letter', () => {
      it('should produce an upper or lower case letter', () => {
        const letter = genome.g.letter();
        expect('abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ').toContain(
          letter
        );
      });
    });

    describe('letterLower', () => {
      it('should produce a lowercase letter', () => {
        const letter = genome.g.letterLower();
        expect('abcdefghijklmnopqrstuvwxyz').toContain(letter);
      });
    });

    describe('letterUpper', () => {
      it('should produce an uppercase letter', () => {
        const letter = genome.g.letterUpper();
        expect('ABCDEFGIJKLMNOPQRSTUVWXYZ').toContain(letter);
      });
    });

    describe('char', () => {
      it('should produce a char', () => {
        const char = genome.g.char();
        expect(
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'
        ).toContain(char);
      });
    });

    describe('element', () => {
      it('should return an element from the provided array', () => {
        const array = [1, 2, 3, 4, 5];
        const element = genome.g.element(array);
        expect(array).toContain(element);
      });
    });

    describe('elements', () => {
      it('should return an array of elements from the provided array', () => {
        const array = [1, 2, 3, 4, 5];
        const elements = genome.g.elements(array);
        elements.forEach(e => expect(array).toContain(e));
      });
    });

    describe('randomElements', () => {
      it('should return an array of elements from the provided array', () => {
        const array = [1, 2, 3, 4, 5];
        const elements = genome.g.randomElements(array);
        elements.forEach(e => expect(array).toContain(e));
      });
    });

    describe('hex', () => {
      it('should return a hexidecimal digit between 0 and f', () => {
        const hex = '0123456789abcdef'.split('');
        const digit = genome.g.hex();

        expect(typeof digit).toBe('string');
        expect(digit.length).toBe(1);

        expect(hex).toContainEqual(digit);
      });
    });
  });
});
