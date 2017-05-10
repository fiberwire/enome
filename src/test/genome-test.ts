import 'mocha';
import { expect } from 'chai';
import { Nucleotide, Genome, EnomeOptions } from "../index";
import * as _ from 'lodash';


describe('genome', () => {
    let gen: Genome<EnomeOptions>;
    beforeEach(() => {
        gen = new Genome({
            genomeLength: 100,
            nucleotideLength: 1
        });
    })
    describe('constructor', () => {
        it('should create a new genome', () => {
            expect(gen.options.genomeLength).to.eql(100);
            expect(gen.options.nucleotideLength).to.eql(1);
            expect(gen).to.be.instanceof(Genome);
        })

        it('should generate a sequence', () => {
            expect(gen.sequence.length).to.eql(gen.options.genomeLength);
        })

        it('should construct nucleotides', () => {
            expect(gen.nucleos.length).to.eql(
                gen.options.genomeLength / gen.options.nucleotideLength
            );
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
                .to.eql(gen.options.genomeLength / gen.options.nucleotideLength);


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

    describe('randomValues', () => {
        it('Should produce an array of specified length of random values', () => {
            let values = gen.randomValues(10);
            expect(values.length).to.eql(10);
            expect(values[0]).not.to.eql(values[1]);
        })
    })

    describe('mutate', () => {
        it('should mutate the genome, given a certain mutation chance (per value in sequence)', () => {
            let mutated: Genome<EnomeOptions> = gen.mutate(0.05);
            expect(mutated.sequence).not.to.eql(gen.sequence);
            expect(mutated.sequence.length).to.eql(gen.sequence.length);
        })
    })

    describe('reproduce', () => {
        it('should produce an offspring genome with genetics from both parents', () => {
            let mutated: Genome<EnomeOptions> = gen.mutate(0.05);
            let offspring: Genome<EnomeOptions> = gen.reproduce(mutated); //last two parameters are relative weights for each parents chance for their genes to be picked

            expect(gen).not.to.eql(mutated);
            expect(gen).not.to.eql(offspring);
            expect(mutated).not.to.eql(offspring);
        });
    })

    describe('reproduceManyToOne', () => {
        it('should produce an offspring from many genomes, given a weight array', () => {
            let offspring: Genome<EnomeOptions>;
            it('should accept an array of Genomes', () => {
                let others = _.range(0, 10).map(i => gen.mutate(0.05))
                let weights = _.range(0, 10).map(i => gen.value);
                offspring = gen.reproduceManyToOne(others, weights);

            })
        });
    });
});