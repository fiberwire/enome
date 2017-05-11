"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const value_1 = require("./value");
//returns n random values between min and max
function values(n, min = 0, max = 1) {
    return _.range(0, n).map(i => value_1.value(min, max));
}
exports.values = values;
//# sourceMappingURL=values.js.map