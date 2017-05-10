"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
function fill(gens, n) {
    while (gens.length < n) {
        let g = new index_1.Genome({ genomeLength: 4, nucleotideLength: 1 });
        //select two random parents, and create an offspring using two random weights
        let p1 = g.nucleo.element(gens);
        let p2 = g.nucleo.element(gens);
        let w1 = g.nucleo.float(0, 1);
        let w2 = g.nucleo.float(0, 1);
        gens.unshift(p1.reproduce(p2, w1, w2));
    }
    return gens;
}
exports.fill = fill;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/operators/fill.js.map