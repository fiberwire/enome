"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replenish_parent_1 = require("./replenish-parent");
function replenishManyParents(parents) {
    return parents.map(replenish_parent_1.replenishParent);
}
exports.replenishManyParents = replenishManyParents;
//# sourceMappingURL=replenish-many-parents.js.map