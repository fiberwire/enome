"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const genome_1 = require("../../src/genotypes/genome");
const mocks_1 = require("../mocks");
const nucleotide_1 = require("../../src/genotypes/nucleotide");
const index_1 = require("../../src/index");
require("mocha");
describe('genotypes', () => {
    describe('genome', () => {
        let { genome } = mocks_1.mocks();
        beforeEach(() => {
            index_1.replenish(genome);
        });
        describe('constructor', () => {
            it('should create a new genome', () => {
                chai_1.expect(genome.options.genomeLength).to.eql(100);
                chai_1.expect(genome.options.nucleotideLength).to.eql(2);
                chai_1.expect(genome).to.be.instanceof(genome_1.Genome);
            });
            it('should generate a sequence', () => {
                chai_1.expect(genome.sequence.length).to.eql(genome.options.genomeLength * genome.options.nucleotideLength);
            });
            it('should construct nucleotides', () => {
                chai_1.expect(genome.nucleos.length).to.eql(genome.options.genomeLength);
            });
        });
        describe('id', () => {
            it('should generate an id of specified length', () => {
                chai_1.expect(genome.id.length).to.eql(genome.idLength);
            });
        });
        describe('nucleotides', () => {
            it('should produce nucleotides from the sequence', () => {
                chai_1.expect(genome.nucleotides.length)
                    .to.eql(genome.options.genomeLength);
                chai_1.expect(genome.nucleotides[0]).to.be.instanceof(nucleotide_1.Nucleotide);
            });
        });
        describe('nucleo', () => {
            it('should produce the next nucleotide in the genome', () => {
                chai_1.expect(genome.nucleo).to.be.instanceof(nucleotide_1.Nucleotide);
                chai_1.expect(genome.nucleo.value).to.be.at.least(0);
                chai_1.expect(genome.nucleo.value).to.be.at.most(1);
                let n1 = genome.nucleo;
                let n2 = genome.nucleo;
                chai_1.expect(n1).not.to.eql(n2);
            });
        });
        describe('nuclei', () => {
            it('should produce the next n nucleotides in the genome', () => {
                const ns = genome.nuclei(5);
                const first5 = genome.nucleotides.slice(0, 5);
                chai_1.expect(ns.length).to.eql(5);
                ns.forEach(n => chai_1.expect(first5).to.include(n));
            });
        });
    });
});
//# sourceMappingURL=genome-test.js.map