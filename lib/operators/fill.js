"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
function fill(gens, n) {
    while (gens.length < n) {
        let g = new index_1.Genome({ genomeLength: 10, nucleotideLength: 1 });
        //select two random parents, and create an offspring using two random weights
        gens.unshift(g.nucleo.element(gens)
            .reproduce(g.nucleo.element(gens), g.nucleo.int(0, 1), g.nucleo.int(0, 1)));
    }
    return gens;
}
exports.fill = fill;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/operators/fill.js.map