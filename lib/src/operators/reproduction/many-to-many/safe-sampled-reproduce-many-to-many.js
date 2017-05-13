"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const sampled_reproduce_many_to_many_1 = require("operators/reproduction/many-to-many/sampled-reproduce-many-to-many");
//produces many offspring from many genomes, each one selected from a sample, then takes the top from original genomes and offspring
function safeSampledReproduceManyToMany(genomes, weights, n, fitness, sampleSize = 5) {
    let offspring = sampled_reproduce_many_to_many_1.sampledReproduceManyToMany(genomes, weights, n, fitness, sampleSize);
    let sorted = _.sortBy(_.concat(genomes, offspring), g => fitness(g).fitness).reverse();
    return sorted.slice(0, n);
}
exports.safeSampledReproduceManyToMany = safeSampledReproduceManyToMany;
//# sourceMappingURL=safe-sampled-reproduce-many-to-many.js.map