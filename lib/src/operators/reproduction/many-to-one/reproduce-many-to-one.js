"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Chance = require("chance");
const genome_1 = require("../../../genotypes/genome");
const value_1 = require("../../value");
let chance = new Chance();
function reproduceManyToOne(genomes, weights = _.range(0, genomes.length).map(i => value_1.value())) {
    let offspringSeq = _
        .zip(...genomes.map(g => g.sequence)) // [0, 1, 2] and [3, 4, 5] => [[0, 3], [1, 4], [2, 5]], for example
        .map((slice) => {
        return chance.weighted(slice, weights);
    });
    return new genome_1.Genome(chance.weighted(genomes, weights).options, offspringSeq);
}
exports.reproduceManyToOne = reproduceManyToOne;
//# sourceMappingURL=reproduce-many-to-one.js.map