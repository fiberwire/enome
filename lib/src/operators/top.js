"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const best_1 = require("./best");
function top(genomes, threshold = 0.5, fitness) {
    let b = best_1.best(genomes, fitness);
    let evals = genomes.map(fitness).sort((a, b) => {
        if (a.fitness > b.fitness)
            return -1;
        else
            return 1;
    });
    //select just the ones that make the cut
    return new index_1.Nucleotide(threshold).elements(evals);
}
exports.top = top;
//# sourceMappingURL=top.js.map