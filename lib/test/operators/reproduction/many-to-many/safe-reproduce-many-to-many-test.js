"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const avg_fitness_1 = require("../../../../src/operators/avg-fitness");
const chai_1 = require("chai");
const mocks_1 = require("../../../mocks");
const replenish_1 = require("../../../../src/operators/replenish");
const safe_reproduce_many_to_many_1 = require("../../../../src/operators/reproduction/many-to-many/safe-reproduce-many-to-many");
require("mocha");
describe('operators', () => {
    describe('reproduction', () => {
        describe('safeReproduceManyToMany', () => {
            let { genomes, fitness } = mocks_1.mocks();
            beforeEach(() => {
                genomes = genomes.map(replenish_1.replenish);
            });
            it('should produce many offspring from many genomes, given a weight array', () => {
                let offspring = safe_reproduce_many_to_many_1.safeReproduceManyToMany(genomes, 5, fitness);
                let avgFit = avg_fitness_1.avgFitness(genomes, fitness);
                chai_1.expect(offspring.length).to.eql(5);
                offspring.forEach(o => {
                    chai_1.expect(o.nucleos.length).to.eql(genomes[0].options.genomeLength);
                });
                genomes.forEach(g => {
                    offspring.forEach(o => {
                        chai_1.expect(o.sequence).to.not.deep.equal(g.sequence);
                        chai_1.expect(fitness(o).fitness).to.be.at.least(avgFit);
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=safe-reproduce-many-to-many-test.js.map