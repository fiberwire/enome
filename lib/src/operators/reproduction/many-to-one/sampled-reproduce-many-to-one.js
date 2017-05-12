"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const reproduce_many_to_one_1 = require("operators/reproduction/many-to-one/reproduce-many-to-one");
const best_1 = require("operators/best");
//produce one offspring from many provided genomes, each one selected from a sample
function sampledReproduceManyToOne(gens, weights, fitness, sampleSize = 5) {
    //produce offspring
    let offspring = _.range(0, sampleSize)
        .map(i => {
        return reproduce_many_to_one_1.reproduceManyToOne(gens, weights);
    });
    return best_1.best(offspring, fitness).genome;
}
exports.sampledReproduceManyToOne = sampledReproduceManyToOne;
//# sourceMappingURL=sampled-reproduce-many-to-one.js.map