"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genome_1 = require("../../genotypes/genome");
//returns a new parent with a new genome that has the same options and sequence as the provided genome,
//essentially replenishing its nucleos
function replenishParent(parent) {
    return { genome: new genome_1.Genome(parent.genome.options, parent.genome.sequence), age: parent.age };
}
exports.replenishParent = replenishParent;
//# sourceMappingURL=replenish-parent.js.map