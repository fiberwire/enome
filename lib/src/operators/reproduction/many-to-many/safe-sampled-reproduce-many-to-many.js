"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const avg_fitness_1 = require("../../avg-fitness");
const sampled_reproduce_many_to_many_1 = require("./sampled-reproduce-many-to-many");
const value_1 = require("../../value");
//produces many offspring from many genomes, each group selected from a sample, then returns the best group of offspring
function safeSampledReproduceManyToMany(genomes, n, fitness, weights = _.range(0, genomes.length).map(i => value_1.value()), sampleSize = 5) {
    let result = [];
    let avgFit = avg_fitness_1.avgFitness(genomes, fitness);
    while (result.length < n) {
        result = _.concat(result, sampled_reproduce_many_to_many_1.sampledReproduceManyToMany(genomes, n, fitness, weights, sampleSize)
            .filter(g => fitness(g).fitness > avgFit));
    }
    return result.slice(0, n);
}
exports.safeSampledReproduceManyToMany = safeSampledReproduceManyToMany;
//# sourceMappingURL=safe-sampled-reproduce-many-to-many.js.map