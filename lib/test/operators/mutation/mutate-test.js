"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocks_1 = require("../../mocks");
const mutate_1 = require("../../../src/operators/mutation/mutate");
const replenish_1 = require("../../../src/operators/replenish");
require("mocha");
describe('operators', () => {
    describe('mutation', () => {
        describe('mutate', () => {
            let { genome } = mocks_1.mocks();
            beforeEach(() => {
                genome = replenish_1.replenish(genome);
            });
            it('should mutate the genome, given a certain mutation chance (per value in sequence)', () => {
                let mutated = mutate_1.mutate(genome, 0.5);
                chai_1.expect(mutated.sequence).to.not.deep.equal(genome.sequence);
                chai_1.expect(mutated.sequence.length).to.equal(genome.sequence.length);
            });
        });
    });
});
//# sourceMappingURL=mutate-test.js.map