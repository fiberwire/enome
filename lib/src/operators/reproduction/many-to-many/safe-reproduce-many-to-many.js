"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const avg_fitness_1 = require("../../avg-fitness");
const fitness_objective_1 = require("../../../enums/fitness-objective");
const reproduce_many_to_many_1 = require("./reproduce-many-to-many");
const value_1 = require("../../value");
function safeReproduceManyToMany(genomes, n, fitness, objective = fitness_objective_1.FitnessObjective.maximize, weights = _.range(0, genomes.length).map(i => value_1.value())) {
    let result = [];
    let avgFit = avg_fitness_1.avgFitness(genomes, fitness);
    switch (objective) {
        case fitness_objective_1.FitnessObjective.maximize:
            while (result.length < n) {
                result = _.concat(result, reproduce_many_to_many_1.reproduceManyToMany(genomes, n, weights)
                    .filter(g => fitness(g).fitness > avgFit));
            }
            break;
        case fitness_objective_1.FitnessObjective.minimize:
            while (result.length < n) {
                result = _.concat(result, reproduce_many_to_many_1.reproduceManyToMany(genomes, n, weights)
                    .filter(g => fitness(g).fitness < avgFit));
            }
            break;
    }
    return result.slice(0, n);
}
exports.safeReproduceManyToMany = safeReproduceManyToMany;
//# sourceMappingURL=safe-reproduce-many-to-many.js.map