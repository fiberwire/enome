"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocks_1 = require("../../mocks");
const replenish_1 = require("../../../src/operators/replenish");
const mutate_1 = require("../../../src/operators/mutation/mutate");
const sampled_reproduce_1 = require("../../../src/operators/reproduction/sampled-reproduce");
require("mocha");
const chai_1 = require("chai");
describe('operators', () => {
    describe('reproduction', () => {
        describe('sampledReproduce', () => {
            let { genome, mutateChance, nsFitness } = mocks_1.mocks();
            beforeEach(() => {
                genome = replenish_1.replenish(genome);
            });
            let mutated = mutate_1.mutate(genome, mutateChance);
            let offspring = sampled_reproduce_1.sampledReproduce(genome, mutated, nsFitness);
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