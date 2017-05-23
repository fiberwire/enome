"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const best_1 = require("../best");
const mutate_1 = require("./mutate");
const mutate_type_1 = require("../../enums/mutate-type");
//produces a number of mutated genomes, then returns the best one.
function sampledMutate(gen, fitness, sampleSize = 5, mutateChance = 0.05, mutateType = mutate_type_1.MutateType.sub) {
    let mutants = _.range(0, sampleSize)
        .map(i => mutate_1.mutate(gen, mutateChance, mutateType));
    return best_1.best(mutants, fitness).genome;
}
exports.sampledMutate = sampledMutate;
//# sourceMappingURL=sampled-mutate.js.map