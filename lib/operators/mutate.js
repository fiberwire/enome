"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sub_1 = require("./mutation/sub");
function mutate(gen, mutateChance = 0.05, mutateType = 'sub') {
    switch (mutateType) {
        case 'sub':
            return sub_1.sub(gen, mutateChance);
        case 'avg':
            return avg(gen, mutateChance);
        default:
            return sub_1.sub(gen, mutateChance);
    }
}
exports.mutate = mutate;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/operators/mutate.js.map