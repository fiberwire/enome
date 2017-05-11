"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const _ = require("lodash");
function reproduceManyToOne(genomes, weights) {
    let offspringSeq = _.zip(genomes.map(g => g.sequence))
        .map((sequences) => {
        return chance.weighted(chance.weighted(sequences, weights), weights);
    });
    return new index_1.Genome(chance.weighted(genomes, weights).options, offspringSeq);
}
exports.reproduceManyToOne = reproduceManyToOne;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/src/operators/reproduction/reproduce-many-to-one.js.map