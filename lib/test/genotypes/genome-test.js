"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const genome_1 = require("genotypes/genome");
const nucleotide_1 = require("genotypes/nucleotide");
describe('genome', () => {
    let gen;
    beforeEach(() => {
        gen = new genome_1.Genome({
            genomeLength: 100,
            nucleotideLength: 2
        });
    });
    describe('constructor', () => {
        it('should create a new genome', () => {
            chai_1.expect(gen.options.genomeLength).to.eql(100);
            chai_1.expect(gen.options.nucleotideLength).to.eql(2);
            chai_1.expect(gen).to.be.instanceof(genome_1.Genome);
        });
        it('should generate a sequence', () => {
            chai_1.expect(gen.sequence.length).to.eql(gen.options.genomeLength * gen.options.nucleotideLength);
        });
        it('should construct nucleotides', () => {
            chai_1.expect(gen.nucleos.length).to.eql(gen.options.genomeLength);
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
                .to.eql(gen.options.genomeLength);
            chai_1.expect(gen.nucleotides[0]).to.be.instanceof(nucleotide_1.Nucleotide);
        });
    });
    describe('nucleo', () => {
        it('should produce the next nucleotide in the genome', () => {
            chai_1.expect(gen.nucleo).to.be.instanceof(nucleotide_1.Nucleotide);
            chai_1.expect(gen.nucleo.value).to.be.at.least(0);
            chai_1.expect(gen.nucleo.value).to.be.at.most(1);
            let n1 = gen.nucleo;
            let n2 = gen.nucleo;
            chai_1.expect(n1).not.to.eql(n2);
        });
    });
    describe('nuclei', () => {
        it('should produce the next n nucleotides in the genome', () => {
            const ns = gen.nuclei(5);
            const first5 = gen.nucleotides.slice(0, 5);
            chai_1.expect(ns.length).to.eql(5);
            ns.forEach(n => chai_1.expect(first5).to.include(n));
        });
    });
});
//# sourceMappingURL=genome-test.js.map