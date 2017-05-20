"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../../index");
//produces a number of mutated genomes, then returns the best one.
function sampledMutate(gen, fitness, sampleSize = 5, mutateChance = 0.05, mutateType = 'sub') {
    let mutants = _.range(0, sampleSize)
        .map(i => index_1.mutate(gen, mutateChance, mutateType));
    return index_1.best(mutants, fitness).genome;
}
exports.sampledMutate = sampledMutate;
//# sourceMappingURL=sampled-mutate.js.map