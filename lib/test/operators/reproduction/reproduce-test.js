"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocks_1 = require("../../mocks");
const mutate_1 = require("../../../src/operators/mutation/mutate");
const replenish_1 = require("../../../src/operators/replenish");
const reproduce_1 = require("../../../src/operators/reproduction/reproduce");
require("mocha");
describe('operators', () => {
    describe('reproduction', () => {
        describe('reproduce', () => {
            let { genome, mutateChance } = mocks_1.mocks();
            beforeEach(() => {
                genome = replenish_1.replenish(genome);
            });
            let mutated = mutate_1.mutate(genome, mutateChance);
            let offspring = reproduce_1.reproduce(genome, mutated);
            it('should produce an offspring genome with genetics from both parents', () => {
                chai_1.expect(mutated.sequence.length).to.eql(genome.sequence.length);
                chai_1.expect(offspring.sequence.length).to.eql(mutated.sequence.length);
                chai_1.expect(genome.sequence).to.not.deep.equal(mutated.sequence);
                chai_1.expect(genome.sequence).to.not.deep.equal(offspring.sequence);
                chai_1.expect(mutated.sequence).to.not.deep.equal(offspring.sequence);
            });
        });
    });
});
//# sourceMappingURL=reproduce-test.js.map