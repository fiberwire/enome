"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fitness_objective_1 = require("../../enums/fitness-objective");
const _ = require("lodash");
const avg_fitness_1 = require("../avg-fitness");
const mutate_op_1 = require("../../enums/mutate-op");
const sampled_mutate_many_1 = require("./sampled-mutate-many");
function safeSampledMutateMany(genomes, fitness, objective = fitness_objective_1.FitnessObjective.maximize, mutateChance = 0.05, mutateType = mutate_op_1.MutateOp.sub, sampleSize = 5) {
    let result = [];
    switch (objective) {
        case fitness_objective_1.FitnessObjective.maximize:
            while (result.length < genomes.length) {
                result = _.concat(result, sampled_mutate_many_1.sampledMutateMany(genomes, fitness, objective, mutateChance, mutateType, sampleSize)
                    .filter(g => fitness(g).fitness > avg_fitness_1.avgFitness(genomes, fitness)));
            }
        case fitness_objective_1.FitnessObjective.minimize:
            while (result.length < genomes.length) {
                result = _.concat(result, sampled_mutate_many_1.sampledMutateMany(genomes, fitness, objective, mutateChance, mutateType, sampleSize)
                    .filter(g => fitness(g).fitness < avg_fitness_1.avgFitness(genomes, fitness)));
            }
    }
    return result.slice(0, genomes.length);
}
exports.safeSampledMutateMany = safeSampledMutateMany;
//# sourceMappingURL=safe-sampled-mutate-many.js.map