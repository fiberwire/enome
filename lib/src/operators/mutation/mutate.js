"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sub_1 = require("./sub");
const avg_1 = require("./avg");
function mutate(gen, mutateChance = 0.05, mutateType = 'sub') {
    switch (mutateType) {
        case 'sub':
            return sub_1.sub(gen, mutateChance);
        case 'avg':
            return avg_1.avg(gen, mutateChance);
        default:
            return sub_1.sub(gen, mutateChance);
    }
}
exports.mutate = mutate;
//# sourceMappingURL=mutate.js.map