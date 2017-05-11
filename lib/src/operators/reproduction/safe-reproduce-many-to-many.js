"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reproduce_many_to_many_1 = require("operators/reproduction/reproduce-many-to-many");
const top_1 = require("operators/top");
const _ = require("lodash");
function safeReproduceManyToMany(gens, weights, n, fitness) {
    let offspring = reproduce_many_to_many_1.reproduceManyToMany(gens, weights, n);
    return top_1.top(_.concat(gens, offspring), 0.5, fitness).map(e => e.genome);
}
exports.safeReproduceManyToMany = safeReproduceManyToMany;
//# sourceMappingURL=safe-reproduce-many-to-many.js.map