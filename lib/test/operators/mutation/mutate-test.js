"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const genome_1 = require("../../../src/genotypes/genome");
const mutate_1 = require("../../../src/operators/mutation/mutate");
describe('operators/mutation', () => {
    describe('mutate', () => {
        let gen;
        beforeEach(() => {
            gen = new genome_1.Genome({
                genomeLength: 10,
                nucleotideLength: 1
            });
        });
        it('should mutate the genome, given a certain mutation chance (per value in sequence)', () => {
            let mutated = mutate_1.mutate(gen, 0.5);
            chai_1.expect(mutated.sequence).not.to.deep.equal(gen.sequence);
            chai_1.expect(mutated.sequence.length).to.equal(gen.sequence.length);
        });
    });
});
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/test/operators/mutation/mutate-test.js.map