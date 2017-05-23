"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const chai_1 = require("chai");
const mocks_1 = require("../../../mocks");
const replenish_1 = require("../../../../src/operators/replenish");
const sampled_reproduce_many_to_one_1 = require("../../../../src/operators/reproduction/many-to-one/sampled-reproduce-many-to-one");
require("mocha");
describe('operators', () => {
    describe('reproduction', () => {
        describe('sampledReproduceManyToOne', () => {
            let { genomes, nsFitness } = mocks_1.mocks();
            beforeEach(() => {
                genomes = genomes.map(replenish_1.replenish);
            });
            let offspring = sampled_reproduce_many_to_one_1.sampledReproduceManyToOne(genomes, nsFitness);
            it('should produce an offspring from many genomes, given a weight array, selected from a sample', () => {
                chai_1.expect(offspring.sequence.length).to.eql(_.meanBy(genomes, g => g.sequence.length));
            });
        });
    });
});
//# sourceMappingURL=samepled-reproduce-many-to-one-test.js.map