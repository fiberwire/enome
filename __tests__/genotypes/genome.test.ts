import * as _ from 'lodash';

import { Gene, Genome, refill } from '../../src/index';
import { mocks } from '../mocks';

describe('genotypes', () => {
  describe('genome', () => {
    let { genome } = mocks();

    beforeEach(() => {
      genome = refill(genome);
    });

    describe('constructor', () => {
      it('should create a new genome', () => {
        expect(genome.options.genomeLength).toEqual(50);
        expect(genome.options.geneLength).toEqual(1);
        expect(genome).toBeInstanceOf(Genome);
      });

      it('should generate a sequence', () => {
        expect(genome.sequence.length).toEqual(
          genome.options.genomeLength * genome.options.geneLength
        );
      });

      it('should construct genes', () => {
        expect(genome.genes.length).toEqual(genome.options.genomeLength);
      });
    });

    describe('id', () => {
      it('should generate an id of specified length', () => {
        expect(genome.options).not.toBeUndefined();
        expect(genome.id.length).toEqual(genome.idLength);
      });
    });

    describe('freshGenes', () => {
      it('should produce genes from the sequence', () => {
        expect(genome.freshGenes.length).toEqual(genome.options.genomeLength);

        expect(genome.freshGenes[0]).toBeInstanceOf(Gene);
      });
    });

    describe('g', () => {
      it('should produce the next gene in the genome', () => {
        expect(genome.g).toBeInstanceOf(Gene);
        expect(genome.g.value).toBeGreaterThanOrEqual(0);
        expect(genome.g.value).toBeLessThanOrEqual(1);

        const n1 = genome.g;
        const n2 = genome.g;

        expect(n1).not.toEqual(n2);
      });
    });

    describe('nuclei', () => {
      it('should produce the next n genes in the genome', () => {
        const ns = genome.gs(5);
        const first5 = genome.freshGenes.slice(0, 5);

        expect(ns.length).toEqual(5);
        ns.forEach(n => expect(first5).toContainEqual(n));
      });
    });
  });
});
