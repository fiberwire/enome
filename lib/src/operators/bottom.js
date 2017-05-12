"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nucleotide_1 = require("genotypes/nucleotide");
const _ = require("lodash");
function bottom(genomes, threshold = 0.5, fitness) {
    //sort evaluations of genomes by fitness, ascending order
    let b = _.sortBy(genomes.map(fitness), e => e.fitness);
    //select just the ones that make the cut
    return new nucleotide_1.Nucleotide(threshold).elements(b);
}
exports.bottom = bottom;
//# sourceMappingURL=bottom.js.map