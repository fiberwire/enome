import * as _ from 'lodash';
import { expect } from 'chai';
import { Genome } from '../../src/genotypes/genome';
import { GenomeOptions } from '../../src/options/genome-options';
import { mocks } from '../mocks';
import { Nucleotide } from '../../src/genotypes/nucleotide';
import { replenish } from '../../src/index';
import 'mocha';

describe('genotypes', () => {


    describe('genome', () => {

        let { genome } = mocks();

        beforeEach(() => {
            genome = replenish(genome);
        })

        describe('constructor', () => {
            it('should create a new genome', () => {
                expect(genome.options.genomeLength).to.eql(50);
                expect(genome.options.nucleotideLength).to.eql(1);
                expect(genome).to.be.instanceof(Genome);
            })

            it('should generate a sequence', () => {
                expect(genome.sequence.length).to.eql(genome.options.genomeLength * genome.options.nucleotideLength);
            })

            it('should construct nucleotides', () => {
                expect(genome.nucleos.length).to.eql(genome.options.genomeLength);
            })
        })

        describe('id', () => {
            it('should generate an id of specified length', () => {
                expect(genome.id.length).to.eql(genome.idLength);
            })
        })

        describe('nucleotides', () => {
            it('should produce nucleotides from the sequence', () => {
                expect(genome.nucleotides.length)
                    .to.eql(genome.options.genomeLength);


                expect(genome.nucleotides[0]).to.be.instanceof(Nucleotide);
            })
        })

        describe('nucleo', () => {
            it('should produce the next nucleotide in the genome', () => {
                expect(genome.nucleo).to.be.instanceof(Nucleotide);
                expect(genome.nucleo.value).to.be.at.least(0);
                expect(genome.nucleo.value).to.be.at.most(1);

                let n1 = genome.nucleo;
                let n2 = genome.nucleo;

                expect(n1).not.to.eql(n2);
            })
        })

        describe('nuclei', () => {
            it('should produce the next n nucleotides in the genome', () => {
                const ns = genome.nuclei(5);
                const first5 = genome.nucleotides.slice(0, 5);

                expect(ns.length).to.eql(5);
                ns.forEach(n => expect(first5).to.include(n));
            })
        })
    })
});