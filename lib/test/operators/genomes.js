"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../../src/index");
function generateGenomes(n, options) {
    return _.range(n).map(i => new index_1.Genome(options));
}
exports.generateGenomes = generateGenomes;
//# sourceMappingURL=genomes.js.map