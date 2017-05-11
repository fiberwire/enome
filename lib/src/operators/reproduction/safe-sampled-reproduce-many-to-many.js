"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const sampled_reproduce_many_to_many_1 = require("operators/reproduction/sampled-reproduce-many-to-many");
const top_1 = require("operators/top");
//produces many offspring from many genomes, each one selected from a sample, then takes the top from original genomes and offspring
function safeSampledReproduceManyToMany(gens, weights, n, fitness, sampleSize = 5) {
    let offspring = sampled_reproduce_many_to_many_1.sampledReproduceManyToMany(gens, weights, n, fitness, sampleSize);
    return top_1.top(_.concat(gens, offspring), 0.5, fitness).map(e => e.genome);
}
exports.safeSampledReproduceManyToMany = safeSampledReproduceManyToMany;
//# sourceMappingURL=safe-sampled-reproduce-many-to-many.js.map