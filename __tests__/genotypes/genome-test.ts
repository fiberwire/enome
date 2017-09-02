import { expect } from 'chai';
import * as _ from 'lodash';
import 'mocha';

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
        expect(genome.options.genomeLength).to.eql(50);
        expect(genome.options.geneLength).to.eql(1);
        expect(genome).to.be.instanceof(Genome);
      });

      it('should generate a sequence', () => {
        expect(genome.sequence.length).to.eql(
          genome.options.genomeLength * genome.options.geneLength
        );
      });

      it('should construct nucleotides', () => {
        expect(genome.genes.length).to.eql(genome.options.genomeLength);
      });
    });

    describe('id', () => {
      it('should generate an id of specified length', () => {
        expect(genome.id.length).to.eql(genome.idLength);
      });
    });

    describe('nucleotides', () => {
      it('should produce genes from the sequence', () => {
        expect(genome.freshGenes.length).to.eql(genome.options.genomeLength);

        expect(genome.freshGenes[0]).to.be.instanceof(Gene);
      });
    });

    describe('nucleo', () => {
      it('should produce the next nucleotide in the genome', () => {
        expect(genome.g).to.be.instanceof(Gene);
        expect(genome.g.value).to.be.at.least(0);
        expect(genome.g.value).to.be.at.most(1);

        const n1 = genome.g;
        const n2 = genome.g;

        expect(n1).not.to.eql(n2);
      });
    });

    describe('nuclei', () => {
      it('should produce the next n nucleotides in the genome', () => {
        const ns = genome.gs(5);
        const first5 = genome.freshGenes.slice(0, 5);

        expect(ns.length).to.eql(5);
        ns.forEach(n => expect(first5).to.include(n));
      });
    });
  });
});
