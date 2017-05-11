"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const _ = require("lodash");
function fill(gens, n) {
    //create offspring to fill array with
    let offspring = _.range(0, n - gens.length)
        .map(i => {
        let g = new index_1.Genome({ genomeLength: 4, nucleotideLength: 1 });
        //select two random parents, and create an offspring using two random weights
        let p1 = g.nucleo.element(gens);
        let p2 = g.nucleo.element(gens);
        let w1 = g.nucleo.float(0, 1);
        let w2 = g.nucleo.float(0, 1);
        return index_1.reproduce(p1, p2, w1, w2);
    });
    return _.concat(gens, offspring);
}
exports.fill = fill;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/src/operators/fill.js.map