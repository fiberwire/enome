"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const reproduce_many_to_one_1 = require("operators/reproduction/many-to-one/reproduce-many-to-one");
const best_1 = require("operators/best");
const top_1 = require("operators/top");
const value_1 = require("operators/value");
//produce one offspring from many provided genomes, then returns the offspring if it is better than the top 50% on average, otherwise returns the best genome
function safeReproduceManyToOne(genomes, fitness, weights = _.range(0, genomes.length).map(i => value_1.value())) {
    let offspring = reproduce_many_to_one_1.reproduceManyToOne(genomes, weights);
    let t = top_1.top(genomes, 0.5, fitness);
    let offspringFitness = fitness(offspring).fitness;
    let avgFitness = _.meanBy(t, e => e.fitness);
    if (offspringFitness > avgFitness) {
        return offspring;
    }
    else {
        return best_1.best(genomes, fitness).genome;
    }
}
exports.safeReproduceManyToOne = safeReproduceManyToOne;
//# sourceMappingURL=safe-reproduce-many-to-one.js.map