"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutate_type_1 = require("../../enums/mutate-type");
const sampled_mutate_1 = require("./sampled-mutate");
const best_1 = require("../best");
function safeSampledMutate(gen, fitness, sampleSize = 5, mutateChance = 0.05, mutateType = mutate_type_1.MutateType.sub) {
    let mutant = sampled_mutate_1.sampledMutate(gen, fitness, sampleSize, mutateChance, mutateType);
    return best_1.best([gen, mutant], fitness).genome;
}
exports.safeSampledMutate = safeSampledMutate;
//# sourceMappingURL=safe-sampled-mutate.js.map