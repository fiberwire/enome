"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const best_1 = require("../best");
const fitness_objective_1 = require("../../enums/fitness-objective");
const mutate_1 = require("./mutate");
const mutate_op_1 = require("../../enums/mutate-op");
const worst_1 = require("../worst");
//returns a mutated genome unless the original genome is more fit, in which case, it returns the original genome
function safeMutate(gen, fitness, objective = fitness_objective_1.FitnessObjective.maximize, mutateChance = 0.05, mutateType = mutate_op_1.MutateOp.sub) {
    let mutant = mutate_1.mutate(gen, mutateChance, mutateType);
    switch (objective) {
        case fitness_objective_1.FitnessObjective.maximize:
            return best_1.best([gen, mutant], fitness).genome;
        case fitness_objective_1.FitnessObjective.minimize:
            return worst_1.worst([gen, mutant], fitness).genome;
    }
}
exports.safeMutate = safeMutate;
//# sourceMappingURL=safe-mutate.js.map