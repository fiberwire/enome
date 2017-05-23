"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const best_1 = require("../best");
const fitness_objective_1 = require("../../enums/fitness-objective");
const reproduce_1 = require("./reproduce");
const worst_1 = require("../worst");
function safeReproduce(gen1, gen2, fitness, objective = fitness_objective_1.FitnessObjective.maximize, weight1 = 1, weight2 = 1, mutateChance = 0.05) {
    let offspring = reproduce_1.reproduce(gen1, gen2, weight1, weight2, mutateChance);
    switch (objective) {
        case fitness_objective_1.FitnessObjective.maximize:
            return best_1.best([gen1, gen2, offspring], fitness).genome;
        case fitness_objective_1.FitnessObjective.minimize:
            return worst_1.worst([gen1, gen2, offspring], fitness).genome;
    }
}
exports.safeReproduce = safeReproduce;
//# sourceMappingURL=safe-reproduce.js.map