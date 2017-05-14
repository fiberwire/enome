"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const best_1 = require("../../best");
const reproduce_many_to_one_1 = require("../many-to-one/reproduce-many-to-one");
const value_1 = require("../../value");
//produces many offspring from many genomes, each one selected from a sample
function sampledReproduceManyToMany(genomes, n, fitness, weights = _.range(0, genomes.length).map(i => value_1.value()), sampleSize = 5) {
    //create many genomes (according to n)
    return _.range(0, n)
        .map(i => {
        //create sample of genomes (according to sampleSize)
        let sample = _.range(0, sampleSize)
            .map(i => reproduce_many_to_one_1.reproduceManyToOne(genomes, weights));
        //return best genome from sample
        return best_1.best(sample, fitness).genome;
    });
}
exports.sampledReproduceManyToMany = sampledReproduceManyToMany;
//# sourceMappingURL=sampled-reproduce-many-to-many.js.map