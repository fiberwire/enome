"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const chance_1 = require("chance");
const index_1 = require("../../index");
const chance = new chance_1.Chance();
function reproduce(gen1, gen2, weight1 = 1, weight2 = 1, mutateChance = 0.05) {
    return index_1.mutate(new index_1.Genome(gen1.options, _.zip(gen1.sequence, gen2.sequence)
        .map((values) => {
        //console.log(`w1: ${w1}, w2: ${w2}`);
        let v = chance.weighted(values, [weight1, weight2]);
        return v;
    })), mutateChance, 'avg');
}
exports.reproduce = reproduce;
//# sourceMappingURL=reproduce.js.map