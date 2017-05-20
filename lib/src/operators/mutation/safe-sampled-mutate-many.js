"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../../index");
function safeSampledMutateMany(genomes, fitness, mutateChance = 0.05, mutateType = 'sub', sampleSize = 5) {
    let result = [];
    while (result.length < genomes.length) {
        result = _.concat(result, index_1.sampledMutateMany(genomes, fitness, mutateChance, mutateType, sampleSize)
            .filter(g => fitness(g).fitness > index_1.avgFitness(genomes, fitness)));
    }
    return result.slice(0, genomes.length);
}
exports.safeSampledMutateMany = safeSampledMutateMany;
//# sourceMappingURL=safe-sampled-mutate-many.js.map