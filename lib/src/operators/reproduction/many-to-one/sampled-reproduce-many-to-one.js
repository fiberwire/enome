"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../../../index");
const fitness_objective_1 = require("../../../enums/fitness-objective");
const worst_1 = require("../../worst");
//produce one offspring from many provided genomes, each one selected from a sample
function sampledReproduceManyToOne(genomes, fitness, objective = fitness_objective_1.FitnessObjective.maximize, weights = _.range(0, genomes.length).map(i => index_1.value()), sampleSize = 5) {
    //produce offspring
    let offspring = _.range(0, sampleSize)
        .map(i => {
        return index_1.reproduceManyToOne(genomes, weights);
    });
    //return best genome
    switch (objective) {
        case fitness_objective_1.FitnessObjective.maximize:
            return index_1.best(offspring, fitness).genome;
        case fitness_objective_1.FitnessObjective.minimize:
            return worst_1.worst(offspring, fitness).genome;
    }
}
exports.sampledReproduceManyToOne = sampledReproduceManyToOne;
//# sourceMappingURL=sampled-reproduce-many-to-one.js.map