"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const reproduce_many_to_many_1 = require("operators/reproduction/many-to-many/reproduce-many-to-many");
const value_1 = require("operators/value");
const avg_fitness_1 = require("operators/avg-fitness");
function safeReproduceManyToMany(genomes, n, fitness, weights = _.range(0, genomes.length).map(i => value_1.value())) {
    let result = [];
    let avgFit = avg_fitness_1.avgFitness(genomes, fitness);
    while (result.length < n) {
        result = _.concat(result, reproduce_many_to_many_1.reproduceManyToMany(genomes, n, weights)
            .filter(g => fitness(g).fitness > avgFit));
    }
    return result.slice(0, n);
}
exports.safeReproduceManyToMany = safeReproduceManyToMany;
//# sourceMappingURL=safe-reproduce-many-to-many.js.map