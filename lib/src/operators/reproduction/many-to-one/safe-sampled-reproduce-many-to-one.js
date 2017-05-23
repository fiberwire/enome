"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const best_1 = require("../../best");
const bottom_1 = require("../../bottom");
const fitness_objective_1 = require("../../../enums/fitness-objective");
const sampled_reproduce_many_to_one_1 = require("./sampled-reproduce-many-to-one");
const top_1 = require("../../top");
const value_1 = require("../../value");
const worst_1 = require("../../worst");
//produce one offspring, selected from a sample, from many provided genomes, then returns the offspring if it is in the top 50%, otherwise returns the best genome
function safeSampledReproduceManyToOne(genomes, fitness, objective = fitness_objective_1.FitnessObjective.maximize, weights = _.range(0, genomes.length).map(i => value_1.value()), sampleSize = 5) {
    let offspring = sampled_reproduce_many_to_one_1.sampledReproduceManyToOne(genomes, fitness, objective, weights, sampleSize);
    let offspringFitness = fitness(offspring).fitness;
    let t = top_1.top(genomes, fitness, 0.5);
    let b = bottom_1.bottom(genomes, fitness, 0.5);
    let topAvgFitness = _.meanBy(t, e => e.fitness);
    let botAvgFitness = _.meanBy(b, e => e.fitness);
    switch (objective) {
        case fitness_objective_1.FitnessObjective.maximize:
            if (offspringFitness > topAvgFitness) {
                return offspring;
            }
            else {
                return best_1.best(genomes, fitness).genome;
            }
        case fitness_objective_1.FitnessObjective.minimize:
            if (offspringFitness < botAvgFitness) {
                return offspring;
            }
            else {
                return worst_1.worst(genomes, fitness).genome;
            }
    }
}
exports.safeSampledReproduceManyToOne = safeSampledReproduceManyToOne;
//# sourceMappingURL=safe-sampled-reproduce-many-to-one.js.map