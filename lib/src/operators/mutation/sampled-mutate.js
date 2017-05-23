"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const best_1 = require("../best");
const fitness_objective_1 = require("../../enums/fitness-objective");
const mutate_1 = require("./mutate");
const mutate_op_1 = require("../../enums/mutate-op");
const worst_1 = require("../worst");
//produces a number of mutated genomes, then returns the best one.
function sampledMutate(gen, fitness, objective = fitness_objective_1.FitnessObjective.maximize, sampleSize = 5, mutateChance = 0.05, mutateType = mutate_op_1.MutateOp.sub) {
    let mutants = _.range(0, sampleSize)
        .map(i => mutate_1.mutate(gen, mutateChance, mutateType));
    switch (objective) {
        case fitness_objective_1.FitnessObjective.maximize:
            return best_1.best(mutants, fitness).genome;
        case fitness_objective_1.FitnessObjective.minimize:
            return worst_1.worst(mutants, fitness).genome;
    }
}
exports.sampledMutate = sampledMutate;
//# sourceMappingURL=sampled-mutate.js.map