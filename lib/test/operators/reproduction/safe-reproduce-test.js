"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const best_1 = require("../../../src/operators/best");
const chai_1 = require("chai");
const mocks_1 = require("../../mocks");
const mutate_1 = require("../../../src/operators/mutation/mutate");
const replenish_1 = require("../../../src/operators/replenish");
const safe_reproduce_1 = require("../../../src/operators/reproduction/safe-reproduce");
require("mocha");
describe('operators', () => {
    describe('reproduction', () => {
        describe('safeReproduce', () => {
            let { genome, fitness, mutateChance } = mocks_1.mocks();
            beforeEach(() => {
                genome = replenish_1.replenish(genome);
            });
            let mutant = mutate_1.mutate(genome, mutateChance);
            let offspring = safe_reproduce_1.safeReproduce(genome, mutant, fitness, mutateChance = mutateChance);
            it('should produce an offspring genome with genetics from both parents', () => {
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
//# sourceMappingURL=safe-reproduce-test.js.map