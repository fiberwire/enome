"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fitness_objective_1 = require("../../enums/fitness-objective");
const mutate_op_1 = require("../../enums/mutate-op");
const _ = require("lodash");
const index_1 = require("../../index");
function safeMutateMany(genomes, fitness, objective = fitness_objective_1.FitnessObjective.maximize, mutateChance = 0.05, mutateType = mutate_op_1.MutateOp.sub) {
    let result = [];
    switch (objective) {
        case fitness_objective_1.FitnessObjective.maximize:
            while (result.length < genomes.length) {
                result = _.concat(result, index_1.mutateMany(genomes, mutateChance, mutateType)
                    .filter(g => fitness(g).fitness > index_1.avgFitness(genomes, fitness)));
            }
        case fitness_objective_1.FitnessObjective.minimize:
            while (result.length < genomes.length) {
                result = _.concat(result, index_1.mutateMany(genomes, mutateChance, mutateType)
                    .filter(g => fitness(g).fitness < index_1.avgFitness(genomes, fitness)));
            }
    }
    return result.slice(0, genomes.length);
}
exports.safeMutateMany = safeMutateMany;
//# sourceMappingURL=safe-mutate-many.js.map