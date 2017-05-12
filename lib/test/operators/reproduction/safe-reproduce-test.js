"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const mutate_1 = require("operators/mutation/mutate");
const mocks_1 = require("../../mocks");
const replenish_1 = require("operators/replenish");
const safe_reproduce_1 = require("operators/reproduction/safe-reproduce");
describe('operators/reproduction', () => {
    describe('safeReproduce', () => {
        let { genome, fitness, mutateChance } = mocks_1.mocks();
        beforeEach(() => {
            genome = replenish_1.replenish(genome);
        });
        it('should produce an offspring genome with genetics from both parents', () => {
            let mutated = mutate_1.mutate(genome, mutateChance);
            chai_1.expect(mutated.sequence.length).to.eql(genome.sequence.length);
            chai_1.expect(mutated.nucleos.length).to.eql(mutated.options.genomeLength);
            let offspring = safe_reproduce_1.safeReproduce(genome, mutated, fitness, mutateChance = 0.5); //last two parameters are relative weights for each parents chance for their genes to be picked
            chai_1.expect(offspring.sequence.length).to.eql(mutated.sequence.length);
            chai_1.expect(genome).not.to.eql(mutated);
            chai_1.expect(genome).not.to.eql(offspring);
            chai_1.expect(mutated).not.to.eql(offspring);
        });
    });
});
//# sourceMappingURL=safe-reproduce-test.js.map