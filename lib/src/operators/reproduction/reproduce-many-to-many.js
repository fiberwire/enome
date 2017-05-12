"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const _ = require("lodash");
function reproduceManyToMany(genomes, weights, n) {
    return _.range(0, n)
        .map(i => {
        let offspringSeq = _.zip(genomes.map(g => g.sequence))
            .map((sequences) => {
            return chance.weighted(chance.weighted(sequences, weights), weights);
        });
        return new index_1.Genome(chance.weighted(genomes, weights).options, offspringSeq);
    });
}
exports.reproduceManyToMany = reproduceManyToMany;
//# sourceMappingURL=reproduce-many-to-many.js.map