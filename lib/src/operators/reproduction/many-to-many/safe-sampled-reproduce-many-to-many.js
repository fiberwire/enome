"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../../../index");
//produces many offspring from many genomes, each group selected from a sample, then returns the best group of offspring
function safeSampledReproduceManyToMany(genomes, n, fitness, sampleSize = 5, weights = _.range(0, genomes.length).map(i => index_1.value())) {
    let result = [];
    let avgFit = index_1.avgFitness(genomes, fitness);
    while (result.length < n) {
        result = _.concat(result, index_1.sampledReproduceManyToMany(genomes, n, fitness, sampleSize, weights)
            .filter(g => fitness(g).fitness > avgFit));
    }
    return result.slice(0, n);
}
exports.safeSampledReproduceManyToMany = safeSampledReproduceManyToMany;
//# sourceMappingURL=safe-sampled-reproduce-many-to-many.js.map