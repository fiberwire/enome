"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genome_1 = require("../../genotypes/genome");
const value_1 = require("../value");
function avg(gen, mutateChance) {
    return new genome_1.Genome(gen.options, gen.sequence.map(v => {
        if (value_1.value() <= mutateChance) {
            return (value_1.value() + v) / 2;
        }
        else {
            return v;
        }
    }));
}
exports.avg = avg;
//# sourceMappingURL=avg.js.map