"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const best_1 = require("../../best");
const bottom_1 = require("../../bottom");
const fitness_objective_1 = require("../../../enums/fitness-objective");
const reproduce_many_to_one_1 = require("./reproduce-many-to-one");
const top_1 = require("../../top");
const value_1 = require("../../value");
const worst_1 = require("../../worst");
//produce one offspring from many provided genomes, then returns the offspring if it is better than the top 50% on average, otherwise returns the best genome
function safeReproduceManyToOne(genomes, fitness, objective = fitness_objective_1.FitnessObjective.maximize, weights = _.range(0, genomes.length).map(i => value_1.value())) {
    let offspring = reproduce_many_to_one_1.reproduceManyToOne(genomes, weights);
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
exports.safeReproduceManyToOne = safeReproduceManyToOne;
//# sourceMappingURL=safe-reproduce-many-to-one.js.map