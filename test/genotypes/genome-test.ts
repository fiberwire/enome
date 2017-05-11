import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { Nucleotide } from "genotypes/nucleotide";


describe('genome', () => {
    let gen: Genome<GenomeOptions>;
    beforeEach(() => {
        gen = new Genome({
            genomeLength: 100,
            nucleotideLength: 2
        });
    })
    describe('constructor', () => {
        it('should create a new genome', () => {
            expect(gen.options.genomeLength).to.eql(100);
            expect(gen.options.nucleotideLength).to.eql(2);
            expect(gen).to.be.instanceof(Genome);
        })

        it('should generate a sequence', () => {
            expect(gen.sequence.length).to.eql(gen.options.genomeLength * gen.options.nucleotideLength);
        })

        it('should construct nucleotides', () => {
            expect(gen.nucleos.length).to.eql(gen.options.genomeLength);
        })
    })

    describe('id', () => {
        it('should generate an id of specified length', () => {
            expect(gen.id.length).to.eql(gen.idLength);
        })
    })

    describe('nucleotides', () => {
        it('should produce nucleotides from the sequence', () => {
            expect(gen.nucleotides.length)
                .to.eql(gen.options.genomeLength);


            expect(gen.nucleotides[0]).to.be.instanceof(Nucleotide);
        })
    })

    describe('nucleo', () => {
        it('should produce the next nucleotide in the genome', () => {
            expect(gen.nucleo).to.be.instanceof(Nucleotide);
            expect(gen.nucleo.value).to.be.at.least(0);
            expect(gen.nucleo.value).to.be.at.most(1);

            let n1 = gen.nucleo;
            let n2 = gen.nucleo;

            expect(n1).not.to.eql(n2);
        })
    })
})