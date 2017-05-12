"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const mutate_1 = require("operators/mutation/mutate");
const mocks_1 = require("../../mocks");
const replenish_1 = require("operators/replenish");
const best_1 = require("operators/best");
const safe_sampled_reproduce_1 = require("operators/reproduction/safe-sampled-reproduce");
describe('operators', () => {
    describe('reproduction', () => {
        describe('safeSampledReproduce', () => {
            let { genome, fitness, mutateChance } = mocks_1.mocks();
            beforeEach(() => {
                genome = replenish_1.replenish(genome);
            });
            let mutant = mutate_1.mutate(genome, mutateChance);
            let offspring = safe_sampled_reproduce_1.safeSampledReproduce(genome, mutant, fitness, mutateChance = mutateChance);
            it('should produce an offspring genome with genetics from both parents, selected from a sample', () => {
                chai_1.expect(mutant.sequence.length).to.eql(genome.sequence.length);
                chai_1.expect(offspring.sequence.length).to.eql(mutant.sequence.length);
            });
            it('should return the offspring if it is better than both parents, otherwise should return the best parent', () => {
                if (fitness(offspring).fitness > best_1.best([genome, mutant], fitness).fitness) {
                    chai_1.expect(offspring.sequence).to.not.deep.equal(genome.sequence);
                    chai_1.expect(offspring.sequence).to.not.deep.equal(mutant.sequence);
                }
                else {
                    chai_1.expect(offspring.sequence).to.deep.equal(best_1.best([genome, mutant], fitness).genome.sequence);
                }
            });
        });
    });
});
//# sourceMappingURL=safe-sampled-reproduce-test.js.map