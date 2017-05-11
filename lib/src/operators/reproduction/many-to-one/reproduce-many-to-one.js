"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const genome_1 = require("genotypes/genome");
function reproduceManyToOne(genomes, weights) {
    let offspringSeq = _.zip(genomes.map(g => g.sequence))
        .map((sequences) => {
        return chance.weighted(chance.weighted(sequences, weights), weights);
    });
    return new genome_1.Genome(chance.weighted(genomes, weights).options, offspringSeq);
}
exports.reproduceManyToOne = reproduceManyToOne;
//# sourceMappingURL=reproduce-many-to-one.js.map