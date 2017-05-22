"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const genome_1 = require("../genotypes/genome");
function generateGenomes(n, options) {
    return _.range(n).map(i => new genome_1.Genome(options));
}
exports.generateGenomes = generateGenomes;
//# sourceMappingURL=generate-genomes.js.map