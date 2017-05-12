"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const replenish_1 = require("operators/replenish");
const mocks_1 = require("../../mocks");
const safe_sampled_mutate_1 = require("operators/mutation/safe-sampled-mutate");
describe('operators', () => {
    describe('mutation', () => {
        describe('safeSampledMutate', () => {
            let { genome, fitness, mutateChance } = mocks_1.mocks();
            beforeEach(() => {
                genome = replenish_1.replenish(genome);
            });
            it('should return a mutated genome from a sampled if it\'s better than the provided one, otherwise, should return the provided genome', () => {
                let mutant = safe_sampled_mutate_1.safeSampledMutate(genome, fitness, 5, mutateChance);
                chai_1.expect(mutant.sequence.length).to.equal(genome.sequence.length);
                chai_1.expect(fitness(mutant).fitness).to.be.at.least(fitness(genome).fitness);
                if (fitness(mutant).fitness > fitness(genome).fitness) {
                    chai_1.expect(mutant.sequence).not.to.deep.equal(genome.sequence);
                }
                else {
                    chai_1.expect(mutant.sequence).to.deep.equal(genome.sequence);
                }
            });
        });
    });
});
//# sourceMappingURL=safe-sampled-mutate-test.js.map