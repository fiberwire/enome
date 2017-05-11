"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reproduce_1 = require("operators/reproduction/reproduce");
const best_1 = require("operators/best");
function safeReproduce(gen1, gen2, fitness, weight1 = 1, weight2 = 1, mutateChance = 0.05) {
    let offspring = reproduce_1.reproduce(gen1, gen2, weight1, weight2, mutateChance);
    return best_1.best([gen1, gen2, offspring], fitness).genome;
}
exports.safeReproduce = safeReproduce;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/src/operators/reproduction/safe-reproduce.js.map