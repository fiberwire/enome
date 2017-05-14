"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const avg_1 = require("../../../src/operators/mutation/avg");
const chai_1 = require("chai");
const mocks_1 = require("../../mocks");
const replenish_1 = require("../../../src/operators/replenish");
require("mocha");
describe('operators', () => {
    describe('mutation', () => {
        let { genome } = mocks_1.mocks();
        beforeEach(() => {
            genome = replenish_1.replenish(genome);
        });
        describe('avg', () => {
            it('should mutate a genome by averaging mutated values with randomly generated values', () => {
                let mutant = avg_1.avg(genome, 1);
                chai_1.expect(mutant.sequence.length).to.eql(genome.sequence.length);
                chai_1.expect(mutant.sequence).not.to.deep.equal(genome.sequence);
            });
        });
    });
});
//# sourceMappingURL=avg-test.js.map