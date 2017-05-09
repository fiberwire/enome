"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genome_1 = require("./genome");
const nucleotide_1 = require("./nucleotide");
const rxjs_1 = require("rxjs");
const Chance = require("chance");
require("core-js/shim");
const chance = new Chance();
class ReactiveGenome extends genome_1.Genome {
    constructor(options, idLength = 12) {
        super(options, idLength);
        this.options = options;
        this.idLength = idLength;
        this.sequence$.subscribe(value => this.sequence.push(value));
        this.nucleotides$.subscribe(nucleo => this.nucleos.push(nucleo));
    }
    get nucleos$() {
        return rxjs_1.Observable.generate(this.nucleo, nucleo => true, nucleo => this.nucleo, nucleo => nucleo);
        //.filter(nucleo => this.nucleos.length > 0)
    }
    get sequence$() {
        return this.randomValues$
            .take(this.options.genomeLength);
    }
    get nucleotides$() {
        return this.sequence$
            .bufferCount(this.options.nucleotideLength)
            .map((values) => {
            return values.reduce((x, y) => (x + y) / 2);
        })
            .map((value) => new nucleotide_1.Nucleotide(value));
    }
    get randomValues$() {
        return rxjs_1.Observable.generate(chance.floating({ min: 0, max: 1 }), //start with a random value
        value => true, //generate indefinitely
        value => chance.floating({ min: 0, max: 1 }), //generate random values
        value => value //select generated value
        );
    }
}
exports.ReactiveGenome = ReactiveGenome;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/genotypes/reactive-genome.js.map