"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutate_op_1 = require("../../enums/mutate-op");
const index_1 = require("../../index");
function mutate(gen, mutateChance = 0.05, mutateType = mutate_op_1.MutateOp.sub) {
    switch (mutateType) {
        case mutate_op_1.MutateOp.sub:
            return index_1.sub(gen, mutateChance);
        case mutate_op_1.MutateOp.avg:
            return index_1.avg(gen, mutateChance);
        default:
            return index_1.sub(gen, mutateChance);
    }
}
exports.mutate = mutate;
//# sourceMappingURL=mutate.js.map