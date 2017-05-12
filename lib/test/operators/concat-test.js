"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const mocks_1 = require("../mocks");
const replenish_1 = require("operators/replenish");
const concat_1 = require("operators/concat");
describe('operators', () => {
    describe('concat', () => {
        let { genomes } = mocks_1.mocks();
        beforeEach(() => {
            genomes = genomes.map(replenish_1.replenish);
        });
        it('should return a genome whose sequence is a concatenation of the provided genomes', () => {
            let [g1, g2] = genomes;
            let g3 = concat_1.concat(g1, g2);
            chai_1.expect(g3.sequence.length).to.eql(g1.sequence.length + g2.sequence.length);
        });
    });
});
//# sourceMappingURL=concat-test.js.map