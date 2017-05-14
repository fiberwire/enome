"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const avg_fitness_1 = require("../avg-fitness");
const mutate_many_1 = require("./mutate-many");
function safeMutateMany(genomes, fitness, mutateChance = 0.05, mutateType = 'sub') {
    let result = [];
    while (result.length < genomes.length) {
        result = _.concat(result, mutate_many_1.mutateMany(genomes, mutateChance, mutateType)
            .filter(g => fitness(g).fitness > avg_fitness_1.avgFitness(genomes, fitness)));
    }
    return result.slice(0, genomes.length);
}
exports.safeMutateMany = safeMutateMany;
//# sourceMappingURL=safe-mutate-many.js.map