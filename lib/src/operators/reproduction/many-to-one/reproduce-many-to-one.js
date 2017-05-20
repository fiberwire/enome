"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Chance = require("chance");
const index_1 = require("../../../index");
let chance = new Chance();
function reproduceManyToOne(genomes, weights = _.range(0, genomes.length).map(i => index_1.value())) {
    let offspringSeq = _
        .zip(...genomes.map(g => g.sequence)) // [0, 1, 2] and [3, 4, 5] => [[0, 3], [1, 4], [2, 5]], for example
        .map((slice) => {
        return chance.weighted(slice, weights);
    });
    return new index_1.Genome(chance.weighted(genomes, weights).options, offspringSeq);
}
exports.reproduceManyToOne = reproduceManyToOne;
//# sourceMappingURL=reproduce-many-to-one.js.map