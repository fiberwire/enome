"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const mutate_1 = require("operators/mutation/mutate");
function sampledMutate(gen, fitness, sampleSize = 5, mutateChance = 0.05, mutateType = 'sub') {
    let mutants = _.range(0, sampleSize)
        .map(i => mutate_1.mutate(gen, mutateChance, mutateType))
        .map(fitness);
    return _.maxBy(mutants, m => m.fitness).genome;
}
exports.sampledMutate = sampledMutate;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/src/operators/mutation/sampled-mutate.js.map