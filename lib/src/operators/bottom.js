"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const nucleotide_1 = require("../genotypes/nucleotide");
function bottom(genomes, fitness, percent = 0.5) {
    //sort evaluations of genomes by fitness, ascending order
    let b = _.sortBy(genomes.map(fitness), e => e.fitness);
    //select just the ones that make the cut
    return new nucleotide_1.Nucleotide(percent).elements(b);
}
exports.bottom = bottom;
//# sourceMappingURL=bottom.js.map