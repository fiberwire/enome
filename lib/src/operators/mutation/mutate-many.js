"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutate_op_1 = require("../../enums/mutate-op");
const index_1 = require("../../index");
function mutateMany(genomes, mutateChance = 0.05, mutateType = mutate_op_1.MutateOp.sub) {
    return genomes.map(g => index_1.mutate(g, mutateChance, mutateType));
}
exports.mutateMany = mutateMany;
//# sourceMappingURL=mutate-many.js.map