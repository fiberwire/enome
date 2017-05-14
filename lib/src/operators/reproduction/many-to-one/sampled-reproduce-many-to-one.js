"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const best_1 = require("../../best");
const reproduce_many_to_one_1 = require("./reproduce-many-to-one");
const value_1 = require("../../value");
//produce one offspring from many provided genomes, each one selected from a sample
function sampledReproduceManyToOne(genomes, fitness, weights = _.range(0, genomes.length).map(i => value_1.value()), sampleSize = 5) {
    //produce offspring
    let offspring = _.range(0, sampleSize)
        .map(i => {
        return reproduce_many_to_one_1.reproduceManyToOne(genomes, weights);
    });
    return best_1.best(offspring, fitness).genome;
}
exports.sampledReproduceManyToOne = sampledReproduceManyToOne;
//# sourceMappingURL=sampled-reproduce-many-to-one.js.map