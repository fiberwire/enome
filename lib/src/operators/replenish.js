"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
//returns a new genome with the same options and sequence as the provided genome,
//essentially replenishing its nucleos
function replenish(gen) {
    return new index_1.Genome(gen.options, gen.sequence);
}
exports.replenish = replenish;
//# sourceMappingURL=replenish.js.map