"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const index_2 = require("./index");
function top(gens, cutoff = 0.5, fitness) {
    let b = index_2.best(gens, fitness);
    let evals = gens.map(fitness).sort((a, b) => {
        if (a.fitness > b.fitness)
            return -1;
        else
            return 1;
    });
    //select just the ones that make the cut
    return new index_1.Nucleotide(cutoff).elements(evals);
}
exports.top = top;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/operators/top.js.map