"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fitness_objective_1 = require("../../../src/enums/fitness-objective");
const chai_1 = require("chai");
const mocks_1 = require("../../mocks");
const replenish_1 = require("../../../src/operators/replenish");
const safe_sampled_mutate_1 = require("../../../src/operators/mutation/safe-sampled-mutate");
require("mocha");
describe('operators', () => {
    describe('mutation', () => {
        describe('safeSampledMutate', () => {
            let { genome, nsFitness, mutateChance } = mocks_1.mocks();
            beforeEach(() => {
                genome = replenish_1.replenish(genome);
            });
            it('should return a mutated genome from a sampled if it\'s better than the provided one, otherwise, should return the provided genome', () => {
                let mutant = safe_sampled_mutate_1.safeSampledMutate(genome, nsFitness, fitness_objective_1.FitnessObjective.maximize, 5, mutateChance);
                chai_1.expect(mutant.sequence.length).to.equal(genome.sequence.length);
                chai_1.expect(nsFitness(mutant).fitness).to.be.at.least(nsFitness(genome).fitness);
                if (nsFitness(mutant).fitness > nsFitness(genome).fitness) {
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