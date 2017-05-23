"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const best_1 = require("../best");
const fitness_objective_1 = require("../../enums/fitness-objective");
const mutate_1 = require("./mutate");
const mutate_op_1 = require("../../enums/mutate-op");
const worst_1 = require("../worst");
function sampledMutateMany(genomes, fitness, objective = fitness_objective_1.FitnessObjective.maximize, mutateChance = 0.05, mutateType = mutate_op_1.MutateOp.sub, sampleSize = 5) {
    switch (objective) {
        case fitness_objective_1.FitnessObjective.maximize:
            return genomes.map(g => {
                let sample = _.range(0, sampleSize).map(i => mutate_1.mutate(g, mutateChance, mutateType));
                return best_1.best(sample, fitness).genome;
            });
        case fitness_objective_1.FitnessObjective.minimize:
            return genomes.map(g => {
                let sample = _.range(0, sampleSize).map(i => mutate_1.mutate(g, mutateChance, mutateType));
                return worst_1.worst(sample, fitness).genome;
            });
    }
}
exports.sampledMutateMany = sampledMutateMany;
//# sourceMappingURL=sampled-mutate-many.js.map