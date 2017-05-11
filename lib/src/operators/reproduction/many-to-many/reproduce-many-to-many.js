"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const genome_1 = require("genotypes/genome");
function reproduceManyToMany(genomes, weights, n) {
    return _.range(0, n)
        .map(i => {
        let offspringSeq = _.zip(genomes.map(g => g.sequence))
            .map((sequences) => {
            return chance.weighted(chance.weighted(sequences, weights), weights);
        });
        return new genome_1.Genome(chance.weighted(genomes, weights).options, offspringSeq);
    });
}
exports.reproduceManyToMany = reproduceManyToMany;
//# sourceMappingURL=reproduce-many-to-many.js.map