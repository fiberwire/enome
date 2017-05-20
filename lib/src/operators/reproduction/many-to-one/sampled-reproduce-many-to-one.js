"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../../../index");
//produce one offspring from many provided genomes, each one selected from a sample
function sampledReproduceManyToOne(genomes, fitness, weights = _.range(0, genomes.length).map(i => index_1.value()), sampleSize = 5) {
    //produce offspring
    let offspring = _.range(0, sampleSize)
        .map(i => {
        return index_1.reproduceManyToOne(genomes, weights);
    });
    return index_1.best(offspring, fitness).genome;
}
exports.sampledReproduceManyToOne = sampledReproduceManyToOne;
//# sourceMappingURL=sampled-reproduce-many-to-one.js.map