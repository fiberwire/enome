"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Chance = require("chance");
const reproduce_many_to_one_1 = require("operators/reproduction/many-to-one/reproduce-many-to-one");
const value_1 = require("operators/value");
const chance = new Chance();
function reproduceManyToMany(genomes, n, weights = _.range(0, genomes.length).map(i => value_1.value())) {
    return _.range(0, n)
        .map(i => reproduce_many_to_one_1.reproduceManyToOne(genomes, weights));
}
exports.reproduceManyToMany = reproduceManyToMany;
//# sourceMappingURL=reproduce-many-to-many.js.map