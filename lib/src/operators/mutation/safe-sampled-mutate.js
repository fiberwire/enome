"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const best_1 = require("../best");
const fitness_objective_1 = require("../../enums/fitness-objective");
const mutate_op_1 = require("../../enums/mutate-op");
const sampled_mutate_1 = require("./sampled-mutate");
const worst_1 = require("../worst");
function safeSampledMutate(gen, fitness, objective = fitness_objective_1.FitnessObjective.maximize, sampleSize = 5, mutateChance = 0.05, mutateType = mutate_op_1.MutateOp.sub) {
    let mutant = sampled_mutate_1.sampledMutate(gen, fitness, objective, sampleSize, mutateChance, mutateType);
    switch (objective) {
        case fitness_objective_1.FitnessObjective.maximize:
            return best_1.best([gen, mutant], fitness).genome;
        case fitness_objective_1.FitnessObjective.minimize:
            return worst_1.worst([gen, mutant], fitness).genome;
    }
}
exports.safeSampledMutate = safeSampledMutate;
//# sourceMappingURL=safe-sampled-mutate.js.map