"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutate_1 = require("./mutate");
function mutateMany(genomes, mutateChance = 0.05, mutateType = 'sub') {
    return genomes.map(g => mutate_1.mutate(g, mutateChance, mutateType));
}
exports.mutateMany = mutateMany;
//# sourceMappingURL=mutate-many.js.map