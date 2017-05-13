"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const reproduce_many_to_many_1 = require("operators/reproduction/many-to-many/reproduce-many-to-many");
function safeReproduceManyToMany(genomes, weights, n, fitness) {
    let offspring = reproduce_many_to_many_1.reproduceManyToMany(genomes, n, weights);
    let sorted = _.sortBy(_.concat(genomes, offspring), g => fitness(g).fitness).reverse();
    return sorted.slice(0, n);
}
exports.safeReproduceManyToMany = safeReproduceManyToMany;
//# sourceMappingURL=safe-reproduce-many-to-many.js.map