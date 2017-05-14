"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const nucleotide_1 = require("../genotypes/nucleotide");
function top(genomes, threshold = 0.5, fitness) {
    //sort evaluations of genomes by fitness, descending order
    let t = _.sortBy(genomes.map(fitness), e => e.fitness).reverse();
    //select just the ones that make the cut
    return new nucleotide_1.Nucleotide(threshold).elements(t);
}
exports.top = top;
//# sourceMappingURL=top.js.map