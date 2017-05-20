"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
function safeReproduce(gen1, gen2, fitness, weight1 = 1, weight2 = 1, mutateChance = 0.05) {
    let offspring = index_1.reproduce(gen1, gen2, weight1, weight2, mutateChance);
    return index_1.best([gen1, gen2, offspring], fitness).genome;
}
exports.safeReproduce = safeReproduce;
//# sourceMappingURL=safe-reproduce.js.map