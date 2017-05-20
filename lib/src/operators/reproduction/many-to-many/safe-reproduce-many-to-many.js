"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../../../index");
function safeReproduceManyToMany(genomes, n, fitness, weights = _.range(0, genomes.length).map(i => index_1.value())) {
    let result = [];
    let avgFit = index_1.avgFitness(genomes, fitness);
    while (result.length < n) {
        result = _.concat(result, index_1.reproduceManyToMany(genomes, n, weights)
            .filter(g => fitness(g).fitness > avgFit));
    }
    return result.slice(0, n);
}
exports.safeReproduceManyToMany = safeReproduceManyToMany;
//# sourceMappingURL=safe-reproduce-many-to-many.js.map