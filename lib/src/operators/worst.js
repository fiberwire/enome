"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function worst(genomes, fitness) {
    return _.minBy(genomes.map(fitness), e => e.fitness);
}
exports.worst = worst;
//# sourceMappingURL=worst.js.map