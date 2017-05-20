"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
function mutate(gen, mutateChance = 0.05, mutateType = 'sub') {
    switch (mutateType) {
        case 'sub':
            return index_1.sub(gen, mutateChance);
        case 'avg':
            return index_1.avg(gen, mutateChance);
        default:
            return index_1.sub(gen, mutateChance);
    }
}
exports.mutate = mutate;
//# sourceMappingURL=mutate.js.map