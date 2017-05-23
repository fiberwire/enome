"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocks_1 = require("../../mocks");
const replenish_1 = require("../../../src/operators/replenish");
const safe_mutate_1 = require("../../../src/operators/mutation/safe-mutate");
require("mocha");
describe('operators', () => {
    describe('mutation', () => {
        describe('safeMutate', () => {
            let { genome, nsFitness } = mocks_1.mocks();
            beforeEach(() => {
                genome = replenish_1.replenish(genome);
            });
            it('should return a mutated genome if it\'s better than the provided one, otherwise, should return the provided genome', () => {
                let mutant = safe_mutate_1.safeMutate(genome, nsFitness);
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
//# sourceMappingURL=safe-mutate-test.js.map