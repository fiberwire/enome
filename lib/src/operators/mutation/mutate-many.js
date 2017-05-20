"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
function mutateMany(genomes, mutateChance = 0.05, mutateType = 'sub') {
    return genomes.map(g => index_1.mutate(g, mutateChance, mutateType));
}
exports.mutateMany = mutateMany;
//# sourceMappingURL=mutate-many.js.map