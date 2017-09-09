import * as _ from 'lodash';
import { refill, reproduceManyToOne } from "../../../src/index";
import { mocks } from '../../../src/mocks';

describe('operators', () => {
  describe('reproduction', () => {
    describe('reproduceManyToOne', () => {
      let { genomes } = mocks();

      beforeEach(() => {
        genomes = genomes.map(refill);
      });

      it('should produce an offspring from many genomes, given a weight array', () => {
        const offspring = reproduceManyToOne(genomes);
        expect(offspring.genes.length).toEqual(genomes[0].options.genomeLength);

        genomes.forEach(g => {
          expect(offspring.sequence).not.toEqual(g.sequence);
        });
      });
    });
  });
});
