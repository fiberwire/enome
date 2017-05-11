"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const reproduce_many_to_one_1 = require("operators/reproduction/many-to-one/reproduce-many-to-one");
const best_1 = require("operators/best");
const top_1 = require("operators/top");
//produce one offspring from many provided genomes, then returns the offspring if it is in the top 50%, otherwise returns the best genome
function safeReproduceManyToOne(gens, weights, fitness) {
    let offspring = reproduce_many_to_one_1.reproduceManyToOne(gens, weights);
    let t = top_1.top(_.concat([offspring], gens), 0.5, fitness).map(e => e.genome);
    if (_.includes(t, offspring)) {
        return offspring;
    }
    else {
        return best_1.best(t, fitness).genome;
    }
}
exports.safeReproduceManyToOne = safeReproduceManyToOne;
//# sourceMappingURL=safe-reproduce-many-to-one.js.map