"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sampled_mutate_1 = require("operators/mutation/sampled-mutate");
const best_1 = require("operators/best");
function safeSampledMutate(gen, fitness, sampleSize = 5, mutateChance = 0.05, mutateType = 'sub') {
    let mutant = sampled_mutate_1.sampledMutate(gen, fitness, sampleSize, mutateChance, mutateType);
    return best_1.best([gen, mutant], fitness).genome;
}
exports.safeSampledMutate = safeSampledMutate;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/src/operators/mutation/safe-sampled-mutate.js.map