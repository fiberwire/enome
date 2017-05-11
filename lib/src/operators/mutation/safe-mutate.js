"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutate_1 = require("operators/mutation/mutate");
//returns a mutated genome unless the original genome is more fit, in which case, it returns the original genome
function safeMutate(gen, mutateChance = 0.05, mutateType = 'sub', fitness) {
    let mutant = mutate_1.mutate(gen, mutateChance, mutateType);
    if (fitness(mutant).fitness >= fitness(gen).fitness) {
        return mutant;
    }
    else {
        return gen;
    }
}
exports.safeMutate = safeMutate;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/src/operators/mutation/safe-mutate.js.map