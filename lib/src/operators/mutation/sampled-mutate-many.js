"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../../index");
function sampledMutateMany(genomes, fitness, mutateChance = 0.05, mutateType = 'sub', sampleSize = 5) {
    return genomes.map(g => {
        let sample = _.range(0, sampleSize).map(i => index_1.mutate(g, mutateChance, mutateType));
        return index_1.best(sample, fitness).genome;
    });
}
exports.sampledMutateMany = sampledMutateMany;
//# sourceMappingURL=sampled-mutate-many.js.map