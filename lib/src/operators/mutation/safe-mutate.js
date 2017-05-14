"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const best_1 = require("../best");
const mutate_1 = require("./mutate");
//returns a mutated genome unless the original genome is more fit, in which case, it returns the original genome
function safeMutate(gen, fitness, mutateChance = 0.05, mutateType = 'sub') {
    let mutant = mutate_1.mutate(gen, mutateChance, mutateType);
    return best_1.best([gen, mutant], fitness).genome;
}
exports.safeMutate = safeMutate;
//# sourceMappingURL=safe-mutate.js.map