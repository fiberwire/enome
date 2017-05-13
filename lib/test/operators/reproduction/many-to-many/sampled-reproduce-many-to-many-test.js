"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const replenish_1 = require("operators/replenish");
const mocks_1 = require("../../../mocks");
const sampled_reproduce_many_to_many_1 = require("operators/reproduction/many-to-many/sampled-reproduce-many-to-many");
describe('operators', () => {
    describe('reproduction', () => {
        describe('sampledReproduceManyToMany', () => {
            let { genomes, fitness } = mocks_1.mocks();
            beforeEach(() => {
                genomes = genomes.map(replenish_1.replenish);
            });
            it('should produce many offspring from many genomes, given a weight array', () => {
                let offspring = sampled_reproduce_many_to_many_1.sampledReproduceManyToMany(genomes, 5, fitness);
                offspring.forEach(o => {
                    chai_1.expect(o.nucleos.length).to.eql(genomes[0].options.genomeLength);
                });
                genomes.forEach(g => {
                    offspring.forEach(o => {
                        chai_1.expect(o.sequence).to.not.deep.equal(g.sequence);
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=sampled-reproduce-many-to-many-test.js.map