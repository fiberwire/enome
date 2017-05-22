"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const genome_1 = require("../genotypes/genome");
const reproduce_1 = require("./reproduction/reproduce");
function fill(gens, n) {
    //create offspring to fill array with
    let offspring = _.range(0, n - gens.length)
        .map(i => {
        let g = new genome_1.Genome(gens[0].options);
        //select two random parents, and create an offspring using two random weights
        let p1 = g.nucleo.element(gens);
        let p2 = g.nucleo.element(gens);
        let w1 = g.nucleo.float(0, 1);
        let w2 = g.nucleo.float(0, 1);
        return reproduce_1.reproduce(p1, p2, w1, w2);
    });
    return _.concat(gens, offspring);
}
exports.fill = fill;
//# sourceMappingURL=fill.js.map