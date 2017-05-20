"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
function safeSampledMutate(gen, fitness, sampleSize = 5, mutateChance = 0.05, mutateType = 'sub') {
    let mutant = index_1.sampledMutate(gen, fitness, sampleSize, mutateChance, mutateType);
    return index_1.best([gen, mutant], fitness).genome;
}
exports.safeSampledMutate = safeSampledMutate;
//# sourceMappingURL=safe-sampled-mutate.js.map