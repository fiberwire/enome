"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genome_1 = require("./genome");
const nucleotide_1 = require("./nucleotide");
const rx_1 = require("rx");
const Chance = require("chance");
require("core-js/shim");
const chance = new Chance();
class ReactiveGenome extends genome_1.Genome {
    constructor(options, idLength = 12) {
        super(options, idLength);
        this.options = options;
        this.idLength = idLength;
    }
    get sequence$() {
        return rx_1.Observable.generate(chance.floating({ min: 0, max: 1 }), value => {
            this.sequence.unshift(value);
            return this.sequence.length == this.options.genomeLength;
        }, value => chance.floating({ min: 0, max: 1 }), value => value);
    }
    get nucleotides$() {
        return this.sequence$
            .bufferWithCount(this.options.nucleotideLength)
            .map((values) => {
            return values.reduce((x, y) => (x + y) / 2);
        })
            .map((value) => new nucleotide_1.Nucleotide(value));
    }
}
exports.ReactiveGenome = ReactiveGenome;
//# sourceMappingURL=/media/andrew/66AA1A77AA1A43C9/Projects/nodejs/enome/source-maps/src/genotypes/reactive-genome.js.map