"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function best(gens, fitness) {
    return _.maxBy(gens.map(fitness), e => e.fitness);
}
exports.best = best;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/src/operators/best.js.map