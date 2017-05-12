"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const mutate_1 = require("operators/mutation/mutate");
const mocks_1 = require("../../mocks");
const replenish_1 = require("operators/replenish");
const sampled_reproduce_1 = require("operators/reproduction/sampled-reproduce");
describe('operators', () => {
    describe('reproduction', () => {
        describe('sampledReproduce', () => {
            let { genome, mutateChance, fitness } = mocks_1.mocks();
            beforeEach(() => {
                genome = replenish_1.replenish(genome);
            });
            let mutated = mutate_1.mutate(genome, mutateChance);
            let offspring = sampled_reproduce_1.sampledReproduce(genome, mutated, fitness);
            it('should produce an offspring genome with genetics from both parents, selected from a sample', () => {
                chai_1.expect(mutated.sequence.length).to.eql(genome.sequence.length);
                chai_1.expect(offspring.sequence.length).to.eql(mutated.sequence.length);
                chai_1.expect(genome.sequence).to.not.deep.equal(mutated.sequence);
                chai_1.expect(genome.sequence).to.not.deep.equal(offspring.sequence);
                chai_1.expect(mutated.sequence).to.not.deep.equal(offspring.sequence);
            });
        });
    });
});
//# sourceMappingURL=sampled-reproduce-test.js.map