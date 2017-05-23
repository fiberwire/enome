"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutate_type_1 = require("../../enums/mutate-type");
const index_1 = require("../../index");
function mutate(gen, mutateChance = 0.05, mutateType = mutate_type_1.MutateType.sub) {
    switch (mutateType) {
        case mutate_type_1.MutateType.sub:
            return index_1.sub(gen, mutateChance);
        case mutate_type_1.MutateType.avg:
            return index_1.avg(gen, mutateChance);
        default:
            return index_1.sub(gen, mutateChance);
    }
}
exports.mutate = mutate;
//# sourceMappingURL=mutate.js.map