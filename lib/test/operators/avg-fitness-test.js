"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const mocks_1 = require("../mocks");
const avg_fitness_1 = require("operators/avg-fitness");
const _ = require("lodash");
describe('operators', () => {
    let { genomes, fitness } = mocks_1.mocks();
    describe('avgFitness', () => {
        it('should return the average fitness for a given array of genomes, using a given fitness function', () => {
            let avgFit = avg_fitness_1.avgFitness(genomes, fitness);
            chai_1.expect(avgFit).to.eql(_.meanBy(genomes, g => fitness(g).fitness));
        });
    });
});
//# sourceMappingURL=avg-fitness-test.js.map