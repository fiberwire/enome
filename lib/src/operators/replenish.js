"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genome_1 = require("genotypes/genome");
//returns a new genome with the same options and sequence as the provided genome,
//essentially replenishing its nucleos
function replenish(gen) {
    return new genome_1.Genome(gen.options, gen.sequence);
}
exports.replenish = replenish;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/src/operators/replenish.js.map