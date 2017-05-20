"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../../../index");
//produce one offspring, selected from a sample, from many provided genomes, then returns the offspring if it is in the top 50%, otherwise returns the best genome
function safeSampledReproduceManyToOne(genomes, fitness, weights = _.range(0, genomes.length).map(i => index_1.value()), sampleSize = 5) {
    let offspring = index_1.sampledReproduceManyToOne(genomes, fitness, weights, sampleSize);
    let offspringFitness = fitness(offspring).fitness;
    let t = index_1.top(genomes, 0.5, fitness);
    let avgFitness = _.meanBy(t, e => e.fitness);
    if (offspringFitness > avgFitness) {
        return offspring;
    }
    else {
        return index_1.best(genomes, fitness).genome;
    }
}
exports.safeSampledReproduceManyToOne = safeSampledReproduceManyToOne;
//# sourceMappingURL=safe-sampled-reproduce-many-to-one.js.map