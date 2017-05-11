"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const value_1 = require("../value");
function sub(gen, mutateChance) {
    return new index_1.Genome(gen.options, gen.sequence.map(v => {
        if (value_1.value() <= mutateChance) {
            return value_1.value();
        }
        else {
            return v;
        }
    }));
}
exports.sub = sub;
//# sourceMappingURL=sub.js.map