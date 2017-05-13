"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const _ = require("lodash");
const replenish_1 = require("operators/replenish");
const mocks_1 = require("../../../mocks");
const top_1 = require("operators/top");
const best_1 = require("operators/best");
const safe_sampled_reproduce_many_to_one_1 = require("operators/reproduction/many-to-one/safe-sampled-reproduce-many-to-one");
describe('operators', () => {
    describe('reproduction', () => {
        describe('safeSampledReproduceManyToOne', () => {
            let { genomes, fitness } = mocks_1.mocks();
            beforeEach(() => {
                genomes = genomes.map(replenish_1.replenish);
            });
            let offspring = safe_sampled_reproduce_many_to_one_1.safeSampledReproduceManyToOne(genomes, fitness);
            let t = top_1.top(genomes, 0.5, fitness);
            let offspringFitness = fitness(offspring).fitness;
            let avgFitness = _.meanBy(t, e => e.fitness);
            let b = best_1.best(genomes, fitness);
            it('should produce an offspring from many genomes, given a weight array, selected from a sample', () => {
                chai_1.expect(offspring.sequence.length).to.eql(_.meanBy(genomes, g => g.sequence.length));
            });
            it('should return the best parent if the offspring is worse', () => {
                chai_1.expect(offspringFitness).to.be.at.least(avgFitness);
            });
        });
    });
});
//# sourceMappingURL=safe-sampled-reproduce-many-to-one-test.js.map