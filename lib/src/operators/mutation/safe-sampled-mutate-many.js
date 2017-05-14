"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const avg_fitness_1 = require("../avg-fitness");
const sampled_mutate_many_1 = require("./sampled-mutate-many");
function safeSampledMutateMany(genomes, fitness, mutateChance = 0.05, mutateType = 'sub') {
    let result = [];
    while (result.length < genomes.length) {
        result = _.concat(result, sampled_mutate_many_1.sampledMutateMany(genomes, fitness, mutateChance, mutateType)
            .filter(g => fitness(g).fitness > avg_fitness_1.avgFitness(genomes, fitness)));
    }
    return result.slice(0, genomes.length);
}
exports.safeSampledMutateMany = safeSampledMutateMany;
//# sourceMappingURL=safe-sampled-mutate-many.js.map