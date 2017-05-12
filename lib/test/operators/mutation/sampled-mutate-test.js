"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const replenish_1 = require("operators/replenish");
const mocks_1 = require("../../mocks");
const sampled_mutate_1 = require("operators/mutation/sampled-mutate");
describe('operators', () => {
    describe('mutation', () => {
        describe('sampledMutate', () => {
            let { genome, fitness, mutateChance } = mocks_1.mocks();
            beforeEach(() => {
                genome = replenish_1.replenish(genome);
            });
            it('should return the best of a sample of mutated genomes', () => {
                let mutant = sampled_mutate_1.sampledMutate(genome, fitness, 5, mutateChance);
                chai_1.expect(mutant.sequence.length).to.equal(genome.sequence.length);
                chai_1.expect(mutant.sequence).to.not.deep.equal(genome.sequence);
            });
        });
    });
});
//# sourceMappingURL=sampled-mutate-test.js.map