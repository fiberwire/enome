import { expect } from 'chai';
import 'mocha';
import { refill } from '../../src/index';
import { mocks } from '../mocks';

describe('genotypes', () => {
  const { genome } = mocks();

  beforeEach(() => {
    refill(genome);
  });

  describe('nucleotide', () => {
    describe('float', () => {
      it('should produce a float between min and max', () => {
        const f = genome.g.float(0, 1);
        expect(f).to.be.at.least(0);
        expect(f).to.be.at.most(1);
      });
    });

    describe('int', () => {
      it('should produce an int between min and max', () => {
        const i = genome.g.int(1, 10);
        expect(i).to.be.at.least(1);
        expect(i).to.be.at.most(10);
        expect(i % 1).to.eql(0);
      });
    });

    describe('natural', () => {
      it('should produce a natural number between 0 and max', () => {
        const n = genome.g.natural(-1, 10);
        expect(n).to.be.at.least(0);
        expect(n).to.be.at.most(10);
        expect(n % 1).to.eql(0);
      });
    });

    describe('bool', () => {
      it('should produce a boolean', () => {
        const bool = genome.g.bool();
        expect(bool).to.satisfy((b: boolean) => b === true || b === false);
      });
    });

    describe('letter', () => {
      it('should produce an upper or lower case letter', () => {
        const letter = genome.g.letter();
        expect(
          'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ'
        ).to.include(letter);
      });
    });

    describe('letterLower', () => {
      it('should produce a lowercase letter', () => {
        const letter = genome.g.letterLower();
        expect('abcdefghijklmnopqrstuvwxyz').to.include(letter);
      });
    });

    describe('letterUpper', () => {
      it('should produce an uppercase letter', () => {
        const letter = genome.g.letterUpper();
        expect('ABCDEFGIJKLMNOPQRSTUVWXYZ').to.include(letter);
      });
    });

    describe('char', () => {
      it('should produce a char', () => {
        const char = genome.g.char();
        expect(
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'
        ).to.include(char);
      });
    });

    describe('element', () => {
      it('should return an element from the provided array', () => {
        const array = [1, 2, 3, 4, 5];
        const element = genome.g.element(array);
        expect(array).to.include(element);
      });
    });

    describe('elements', () => {
      it('should return an array of elements from the provided array', () => {
        const array = [1, 2, 3, 4, 5];
        const elements = genome.g.elements(array);
        elements.forEach(e => expect(array).to.include(e));
      });
    });

    describe('randomElements', () => {
      it('should return an array of elements from the provided array', () => {
        const array = [1, 2, 3, 4, 5];
        const elements = genome.g.randomElements(array);
        elements.forEach(e => expect(array).to.include(e));
      });
    });
  });
});
