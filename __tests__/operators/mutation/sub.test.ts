import { refill, sub } from "../../../src/index";
import { mocks } from '../../../src/mocks';

describe('operators', () => {
  describe('mutation', () => {
    let { genome } = mocks();

    beforeEach(() => {
      genome = refill(genome);
    });

    describe('sub', () => {
      it('should mutate a genome by replacing values with randomly generated values', () => {
        const mutant = sub(genome, 1);

        expect(mutant.sequence.length).toEqual(genome.sequence.length);
        expect(mutant.sequence).not.toEqual(genome.sequence);
      });
    });
  });
});
