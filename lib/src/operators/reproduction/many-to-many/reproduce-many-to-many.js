"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../../../index");
function reproduceManyToMany(genomes, n, weights = _.range(0, genomes.length).map(i => index_1.value())) {
    return _.range(0, n)
        .map(i => index_1.reproduceManyToOne(genomes, weights));
}
exports.reproduceManyToMany = reproduceManyToMany;
//# sourceMappingURL=reproduce-many-to-many.js.map