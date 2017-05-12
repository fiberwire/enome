"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const genome_1 = require("genotypes/genome");
const avg_1 = require("operators/mutation/avg");
describe('operators/mutation', () => {
    let gen;
    beforeEach(() => {
        gen = new genome_1.Genome({
            genomeLength: 10,
            nucleotideLength: 1
        });
    });
    describe('avg', () => {
        it('should mutate a genome by averaging mutated values with randomly generated values', () => {
            let mutant = avg_1.avg(gen, 1);
            chai_1.expect(mutant.sequence.length).to.eql(gen.sequence.length);
            chai_1.expect(mutant.sequence).not.to.deep.equal(gen.sequence);
        });
    });
});
//# sourceMappingURL=avg-test.js.map