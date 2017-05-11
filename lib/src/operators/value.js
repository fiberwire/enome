"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chance_1 = require("chance");
const chance = new chance_1.Chance();
function value(min = 0, max = 1) {
    return chance.floating({ min: 0, max: 1 });
}
exports.value = value;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/src/operators/value.js.map