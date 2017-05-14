"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const best_1 = require("../best");
const mutate_1 = require("./mutate");
function sampledMutateMany(genomes, fitness, mutateChance = 0.05, mutateType = 'sub', sampleSize = 5) {
    return genomes.map(g => {
        let sample = _.range(0, sampleSize).map(i => mutate_1.mutate(g, mutateChance, mutateType));
        return best_1.best(sample, fitness).genome;
    });
}
exports.sampledMutateMany = sampledMutateMany;
//# sourceMappingURL=sampled-mutate-many.js.map