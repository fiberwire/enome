"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutate_op_1 = require("../../enums/mutate-op");
const _ = require("lodash");
const chance_1 = require("chance");
const genome_1 = require("../../genotypes/genome");
const mutate_1 = require("../mutation/mutate");
const chance = new chance_1.Chance();
function reproduce(gen1, gen2, weight1 = 1, weight2 = 1, mutateChance = 0.05) {
    return mutate_1.mutate(new genome_1.Genome(gen1.options, _.zip(gen1.sequence, gen2.sequence)
        .map((values) => {
        //console.log(`w1: ${w1}, w2: ${w2}`);
        let v = chance.weighted(values, [weight1, weight2]);
        return v;
    })), mutateChance, mutate_op_1.MutateOp.avg);
}
exports.reproduce = reproduce;
//# sourceMappingURL=reproduce.js.map