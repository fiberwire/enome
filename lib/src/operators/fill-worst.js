"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../index");
//replaces the worst genomes with random ones
function fillWorst(genomes, fitness, percent) {
    if (percent > 1 || percent < 0)
        throw ('percent must be a decimal between (0, 1)');
    let removed = index_1.bottom(genomes, percent, fitness).map(e => e.genome);
    let culled = genomes.filter(g => !_.includes(removed, g));
    let random = _.range(removed.length).map(i => new index_1.Genome(genomes[0].options));
    let filled = _.concat(culled, random);
    return filled;
}
exports.fillWorst = fillWorst;
//# sourceMappingURL=fill-worst.js.map