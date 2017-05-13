"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function avgFitness(genomes, fitness) {
    return _.meanBy(genomes, g => fitness(g).fitness);
}
exports.avgFitness = avgFitness;
//# sourceMappingURL=avg-fitness.js.map