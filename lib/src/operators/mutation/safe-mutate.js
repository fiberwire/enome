"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
//returns a mutated genome unless the original genome is more fit, in which case, it returns the original genome
function safeMutate(gen, fitness, mutateChance = 0.05, mutateType = 'sub') {
    let mutant = index_1.mutate(gen, mutateChance, mutateType);
    return index_1.best([gen, mutant], fitness).genome;
}
exports.safeMutate = safeMutate;
//# sourceMappingURL=safe-mutate.js.map