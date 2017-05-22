"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const genome_1 = require("../genotypes/genome");
const nucleotide_1 = require("../genotypes/nucleotide");
//randomly replaces a percent of genomes (regardless of fitness) with random ones
function fillRandom(genomes, percent) {
    if (percent > 1 || percent < 0)
        throw ('percent must be a number between 0 (inclusive) and 1 (inclusive)');
    let removed = new nucleotide_1.Nucleotide(percent).elements(_.shuffle(genomes));
    let culled = genomes.filter(g => !_.includes(removed, g));
    let random = _.range(removed.length).map(i => new genome_1.Genome(genomes[0].options));
    let filled = _.concat(culled, random);
    return filled;
}
exports.fillRandom = fillRandom;
//# sourceMappingURL=fill-random.js.map