"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
function replenishMany(genomes) {
    return genomes.map(g => index_1.replenish(g));
}
exports.replenishMany = replenishMany;
//# sourceMappingURL=replenish-many.js.map