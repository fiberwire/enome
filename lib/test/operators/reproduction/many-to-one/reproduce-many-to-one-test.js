"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const reproduce_many_to_one_1 = require("operators/reproduction/many-to-one/reproduce-many-to-one");
const replenish_1 = require("operators/replenish");
const mocks_1 = require("../../../mocks");
describe('operators', () => {
    describe('reproduction', () => {
        describe('reproduceManyToOne', () => {
            let { genomes } = mocks_1.mocks();
            beforeEach(() => {
                genomes = genomes.map(replenish_1.replenish);
            });
            it('should produce an offspring from many genomes, given a weight array', () => {
                let offspring = reproduce_many_to_one_1.reproduceManyToOne(genomes);
                chai_1.expect(offspring.nucleos.length).to.eql(genomes[0].options.genomeLength);
                genomes.forEach(g => {
                    chai_1.expect(offspring.sequence).to.not.deep.equal(g.sequence);
                });
            });
        });
    });
});
//# sourceMappingURL=reproduce-many-to-one-test.js.map