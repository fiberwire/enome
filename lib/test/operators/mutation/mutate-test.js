"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const mutate_1 = require("operators/mutation/mutate");
const mocks_1 = require("../../mocks");
const replenish_1 = require("operators/replenish");
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