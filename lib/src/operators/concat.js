"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const genome_1 = require("../genotypes/genome");
//returns a new genome whose sequences is a concatenation of the two provided genomes
function concat(gen1, gen2) {
    return new genome_1.Genome(gen1.options, _.concat(gen1.sequence, gen2.sequence));
}
exports.concat = concat;
//# sourceMappingURL=concat.js.map