"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function avgAge(parents) {
    return _.meanBy(parents, p => p.age);
}
exports.avgAge = avgAge;
//# sourceMappingURL=avg-age.js.map