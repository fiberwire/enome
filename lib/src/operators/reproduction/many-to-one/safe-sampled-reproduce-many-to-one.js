"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const best_1 = require("operators/best");
const top_1 = require("operators/top");
const sampled_reproduce_many_to_one_1 = require("operators/reproduction/many-to-one/sampled-reproduce-many-to-one");
//produce one offspring, selected from a sample, from many provided genomes, then returns the offspring if it is in the top 50%, otherwise returns the best genome
function safeSampledReproduceManyToOne(genomes, weights, fitness, sampleSize = 5) {
    let offspring = sampled_reproduce_many_to_one_1.sampledReproduceManyToOne(genomes, weights, fitness, sampleSize);
    let offspringFitness = fitness(offspring).fitness;
    let t = top_1.top(genomes, 0.5, fitness);
    let avgFitness = _.meanBy(t, e => e.fitness);
    if (offspringFitness > avgFitness) {
        return offspring;
    }
    else {
        return best_1.best(genomes, fitness).genome;
    }
}
exports.safeSampledReproduceManyToOne = safeSampledReproduceManyToOne;
//# sourceMappingURL=safe-sampled-reproduce-many-to-one.js.map