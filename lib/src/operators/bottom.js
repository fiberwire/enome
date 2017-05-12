"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worst_1 = require("operators/worst");
const nucleotide_1 = require("genotypes/nucleotide");
function bottom(genomes, threshold = 0.5, fitness) {
    let w = worst_1.worst(genomes, fitness);
    let evals = genomes.map(fitness).sort((a, b) => {
        if (a.fitness < b.fitness)
            return -1;
        else
            return 1;
    });
    //select just the ones that make the cut
    return new nucleotide_1.Nucleotide(threshold).elements(evals);
}
exports.bottom = bottom;
//# sourceMappingURL=bottom.js.map