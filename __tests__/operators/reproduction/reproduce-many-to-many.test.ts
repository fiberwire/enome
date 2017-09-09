import * as _ from 'lodash';
import { refill, reproduceManyToMany } from "../../../src/index";
import { mocks } from '../../../src/mocks';

describe('operators', () => {
  describe('reproduction', () => {
    describe('reproduceManyToMany', () => {
      let { genomes } = mocks();

      beforeEach(() => {
        genomes = genomes.map(refill);
      });

      it('should produce many offspring from many genomes, given a weight array', () => {
        const offspring = reproduceManyToMany(genomes, 5);

        offspring.forEach(o => {
          expect(o.genes.length).toEqual(genomes[0].options.genomeLength);
        });

        genomes.forEach(g => {
          offspring.forEach(o => {
            expect(o.sequence).not.toEqual(g.sequence);
          });
        });
      });
    });
  });
});
