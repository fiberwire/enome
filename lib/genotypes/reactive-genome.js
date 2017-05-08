"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nucleotide_1 = require("./nucleotide");
const rx_1 = require("rx");
const Chance = require("chance");
require("core-js/shim");
const chance = new Chance();
class ReactiveGenome {
    constructor(options) {
        this.options = options;
        this.sequence = this.randomValues().take(options.genomeLength);
        this.nucleotides = this.sequence
            .bufferWithCount(options.nucleotideLength)
            .map((values) => {
            return values.reduce((x, y) => (x + y) / 2);
        })
            .map((value) => new nucleotide_1.Nucleotide(value));
    }
    get randomValue() {
        return chance.floating({ min: 0, max: 1 });
    }
    randomValues() {
        return rx_1.Observable.generate(this.randomValue, x => true, x => chance.floating({ min: 0, max: 1 }), x => x);
    }
}
exports.ReactiveGenome = ReactiveGenome;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/genotypes/reactive-genome.js.map