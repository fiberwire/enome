"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const best_1 = require("../../../../src/operators/best");
const chai_1 = require("chai");
const mocks_1 = require("../../../mocks");
const replenish_1 = require("../../../../src/operators/replenish");
const safe_reproduce_many_to_one_1 = require("../../../../src/operators/reproduction/many-to-one/safe-reproduce-many-to-one");
const top_1 = require("../../../../src/operators/top");
require("mocha");
describe('operators', () => {
    describe('reproduction', () => {
        describe('safeReproduceManyToOne', () => {
            let { genomes, fitness } = mocks_1.mocks();
            beforeEach(() => {
                genomes = genomes.map(replenish_1.replenish);
            });
            let offspring = safe_reproduce_many_to_one_1.safeReproduceManyToOne(genomes, fitness);
            let t = top_1.top(genomes, 0.5, fitness);
            let offspringFitness = fitness(offspring).fitness;
            let avgFitness = _.meanBy(t, e => e.fitness);
            let b = best_1.best(genomes, fitness);
            it('should produce an offspring from many genomes, given a weight array', () => {
                chai_1.expect(offspring.sequence.length).to.eql(_.meanBy(genomes, g => g.sequence.length));
            });
            it('should return the best parent if the offspring is worse', () => {
                chai_1.expect(offspringFitness).to.be.at.least(avgFitness);
            });
        });
    });
});
//# sourceMappingURL=safe-reproduce-many-to-one-test.js.map