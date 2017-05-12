"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const value_1 = require("../value");
function avg(gen, mutateChance) {
    return new index_1.Genome(gen.options, gen.sequence.map(v => {
        if (value_1.value() <= mutateChance) {
            return (value_1.value() + v) / 2;
        }
        else {
            return v;
        }
    }));
}
exports.avg = avg;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/operators/mutation/avg.js.map