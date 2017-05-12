"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reproduce_1 = require("operators/reproduction/reproduce");
const best_1 = require("operators/best");
const _ = require("lodash");
function safeSampledReproduce(gen1, gen2, fitness, samepleSize = 5, weight1 = 1, weight2 = 1, mutateChance = 0.05) {
    let offspring = _.range(0, samepleSize)
        .map(i => reproduce_1.reproduce(gen1, gen2, weight1, weight2, mutateChance));
    return best_1.best(_.concat([gen1, gen2], offspring), fitness).genome;
}
exports.safeSampledReproduce = safeSampledReproduce;
//# sourceMappingURL=safe-sampled-reproduce.js.map