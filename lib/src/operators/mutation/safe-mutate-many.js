"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutate_type_1 = require("../../enums/mutate-type");
const _ = require("lodash");
const index_1 = require("../../index");
function safeMutateMany(genomes, fitness, mutateChance = 0.05, mutateType = mutate_type_1.MutateType.sub) {
    let result = [];
    while (result.length < genomes.length) {
        result = _.concat(result, index_1.mutateMany(genomes, mutateChance, mutateType)
            .filter(g => fitness(g).fitness > index_1.avgFitness(genomes, fitness)));
    }
    return result.slice(0, genomes.length);
}
exports.safeMutateMany = safeMutateMany;
//# sourceMappingURL=safe-mutate-many.js.map