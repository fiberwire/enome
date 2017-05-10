"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const index_1 = require("../index");
const _ = require("lodash");
describe('genome', () => {
    let gen;
    beforeEach(() => {
        gen = new index_1.Genome({
            genomeLength: 100,
            nucleotideLength: 1
        });
    });
    describe('constructor', () => {
        it('should create a new genome', () => {
            chai_1.expect(gen.options.genomeLength).to.eql(100);
            chai_1.expect(gen.options.nucleotideLength).to.eql(1);
            chai_1.expect(gen).to.be.instanceof(index_1.Genome);
        });
        it('should generate a sequence', () => {
            chai_1.expect(gen.sequence.length).to.eql(gen.options.genomeLength);
        });
        it('should construct nucleotides', () => {
            chai_1.expect(gen.nucleos.length).to.eql(gen.options.genomeLength / gen.options.nucleotideLength);
        });
    });
    describe('id', () => {
        it('should generate an id of specified length', () => {
            chai_1.expect(gen.id.length).to.eql(gen.idLength);
        });
    });
    describe('nucleotides', () => {
        it('should produce nucleotides from the sequence', () => {
            chai_1.expect(gen.nucleotides.length)
                .to.eql(gen.options.genomeLength / gen.options.nucleotideLength);
            chai_1.expect(gen.nucleotides[0]).to.be.instanceof(index_1.Nucleotide);
        });
    });
    describe('nucleo', () => {
        it('should produce the next nucleotide in the genome', () => {
            chai_1.expect(gen.nucleo).to.be.instanceof(index_1.Nucleotide);
            chai_1.expect(gen.nucleo.value).to.be.at.least(0);
            chai_1.expect(gen.nucleo.value).to.be.at.most(1);
            let n1 = gen.nucleo;
            let n2 = gen.nucleo;
            chai_1.expect(n1).not.to.eql(n2);
        });
    });
    describe('randomValues', () => {
        it('Should produce an array of specified length of random values', () => {
            let values = gen.randomValues(10);
            chai_1.expect(values.length).to.eql(10);
            chai_1.expect(values[0]).not.to.eql(values[1]);
        });
    });
    describe('mutate', () => {
        it('should mutate the genome, given a certain mutation chance (per value in sequence)', () => {
            let mutated = gen.mutate(0.05);
            chai_1.expect(mutated.sequence).not.to.eql(gen.sequence);
            chai_1.expect(mutated.sequence.length).to.eql(gen.sequence.length);
        });
    });
    describe('reproduce', () => {
        it('should produce an offspring genome with genetics from both parents', () => {
            let mutated = gen.mutate(0.5);
            chai_1.expect(mutated.sequence.length).to.eql(gen.sequence.length);
            chai_1.expect(mutated.nucleos.length).to.eql(mutated.options.genomeLength / mutated.options.nucleotideLength);
            let offspring = gen.reproduce(mutated); //last two parameters are relative weights for each parents chance for their genes to be picked
            chai_1.expect(offspring.sequence.length).to.eql(mutated.sequence.length);
            chai_1.expect(offspring.nucleos.length).to.eql(offspring.options.genomeLength / offspring.options.nucleotideLength);
            let n = offspring.nucleo;
            chai_1.expect(n.value).to.be.at.least(0);
            chai_1.expect(n.value).to.be.at.most(1);
            let i = n.int(1, 100);
            chai_1.expect(i).to.be.at.least(1);
            chai_1.expect(i).to.be.at.most(100);
            chai_1.expect(gen).not.to.eql(mutated);
            chai_1.expect(gen).not.to.eql(offspring);
            chai_1.expect(mutated).not.to.eql(offspring);
        });
    });
    describe('reproduceManyToOne', () => {
        it('should produce an offspring from many genomes, given a weight array', () => {
            let offspring;
            it('should accept an array of Genomes', () => {
                let others = _.range(0, 10).map(i => gen.mutate(0.05));
                let weights = _.range(0, 10).map(i => gen.value);
                offspring = gen.reproduceManyToOne(others, weights);
            });
        });
    });
});
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/test/genome-test.js.map