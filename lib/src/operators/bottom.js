"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../index");
function bottom(genomes, fitness, percent = 0.5) {
    //sort evaluations of genomes by fitness, ascending order
    let b = _.sortBy(genomes.map(fitness), e => e.fitness);
    //select just the ones that make the cut
    return new index_1.Nucleotide(percent).elements(b);
}
exports.bottom = bottom;
//# sourceMappingURL=bottom.js.map