"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reactive_genome_1 = require("../genotypes/reactive-genome");
require("mocha");
const chai_1 = require("chai");
describe('reactive genome', () => {
    let gen;
    beforeEach(() => {
        gen = new reactive_genome_1.ReactiveGenome({
            genomeLength: 100,
            nucleotideLength: 1
        });
    });
    describe('nucleos$', () => {
        it('should return an observable of nucleotides', () => {
            gen.nucleos$.subscribe(nucleo => {
                chai_1.expect(nucleo.value).to.be.at.least(0);
                chai_1.expect(nucleo.value).to.be.at.most(1);
            });
        });
    });
});
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/test/reactive-genome-test.js.map