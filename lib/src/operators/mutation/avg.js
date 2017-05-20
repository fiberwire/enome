"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
function avg(gen, mutateChance) {
    return new index_1.Genome(gen.options, gen.sequence.map(v => {
        if (index_1.value() <= mutateChance) {
            return (index_1.value() + v) / 2;
        }
        else {
            return v;
        }
    }));
}
exports.avg = avg;
//# sourceMappingURL=avg.js.map