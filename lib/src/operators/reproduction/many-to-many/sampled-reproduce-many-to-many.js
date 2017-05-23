"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../../../index");
const fitness_objective_1 = require("../../../enums/fitness-objective");
const worst_1 = require("../../worst");
//produces many offspring from many genomes, each one selected from a sample
function sampledReproduceManyToMany(genomes, n, fitness, objective = fitness_objective_1.FitnessObjective.maximize, sampleSize = 5, weights = _.range(0, genomes.length).map(i => index_1.value())) {
    //create many genomes (according to n)
    return _.range(0, n)
        .map(i => {
        //create sample of genomes (according to sampleSize)
        let sample = _.range(0, sampleSize)
            .map(i => index_1.reproduceManyToOne(genomes, weights));
        //return best genome from sample
        switch (objective) {
            case fitness_objective_1.FitnessObjective.maximize:
                return index_1.best(sample, fitness).genome;
            case fitness_objective_1.FitnessObjective.minimize:
                return worst_1.worst(sample, fitness).genome;
            default:
                return index_1.best(sample, fitness).genome;
        }
    });
}
exports.sampledReproduceManyToMany = sampledReproduceManyToMany;
//# sourceMappingURL=sampled-reproduce-many-to-many.js.map