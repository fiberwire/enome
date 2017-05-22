"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../index");
function generateGenomes(n, options) {
    return _.range(n).map(i => new index_1.Genome(options));
}
exports.generateGenomes = generateGenomes;
//# sourceMappingURL=generate-genomes.js.map