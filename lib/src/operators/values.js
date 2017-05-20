"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../index");
//returns n random values between min and max
function values(n, min = 0, max = 1) {
    return _.range(0, n).map(i => index_1.value(min, max));
}
exports.values = values;
//# sourceMappingURL=values.js.map