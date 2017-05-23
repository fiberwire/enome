"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const chai_1 = require("chai");
const mocks_1 = require("../mocks");
require("mocha");
describe('populations', () => {
    let { natural } = mocks_1.mocks();
    beforeEach(() => {
        natural = mocks_1.mocks().natural;
    });
    describe('NaturalSelection', () => {
        it('should generate genomes', () => {
            chai_1.expect(natural.genomes.length).to.eql(natural.popOptions.populationSize);
        });
        it('should be able to evolve synchronously', () => {
            let gen1 = natural.evolve(1);
            let futureGens = _.range(5).map(i => natural.evolve(2));
            chai_1.expect(_.meanBy(futureGens, g => g.fitness)).to.be.at.least(gen1.fitness);
        });
        it('should be able to evolve asynchronously', () => {
            let gen1 = natural.evolve(1);
            natural.evolve$(10)
                .skip(5)
                .map(e => e.fitness)
                .reduce((a, b) => _.mean([a, b]))
                .subscribe(fitness => {
                chai_1.expect(fitness).to.be.at.least(gen1.fitness);
            });
        });
    });
});
//# sourceMappingURL=natural-selection-test.js.map