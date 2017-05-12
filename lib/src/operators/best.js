"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function best(genomes, fitness) {
    return _.maxBy(genomes.map(fitness), e => e.fitness);
}
exports.best = best;
//# sourceMappingURL=best.js.map