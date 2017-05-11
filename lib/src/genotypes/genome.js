"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chance = require("chance");
const _ = require("lodash");
const nucleotide_1 = require("./nucleotide");
const values_1 = require("../operators/values");
const chance = new Chance();
class Genome {
    constructor(options, sequence = null, idLength = 12) {
        this.options = options;
        this.sequence = sequence;
        this.idLength = idLength;
        if (this.sequence == null) {
            this.sequence = values_1.values(this.options.genomeLength * this.options.nucleotideLength);
        }
        this.nucleos = this.nucleotides;
    }
    // returns a string of lower and upper case letters which are determined by the genome
    get id() {
        let nucleos = this.nucleotides;
        let letters;
        let numLetters = nucleos.length / this.idLength;
        letters = _
            .chunk(nucleos, numLetters).slice(0, this.idLength) //group nucleotides
            .map((n) => n.reduce((p, n) => new nucleotide_1.Nucleotide((p.value + n.value) / 2)) //average nucleotides)
        )
            .map((n) => n.letter());
        //return string of letters
        return letters.reduce((p, n) => p + n);
    }
    //chunks values in sequence together into nucleotides, determined by options.nucleotideLength
    //the longer the nucleotides are, the less sensitive to mutation they are.
    get nucleotides() {
        let nucleos = _
            .chunk(this.sequence, this.options.nucleotideLength)
            .map(n => _.reduce(n, (memo, num) => memo + num, 0) / n.length || 1)
            .map(n => new nucleotide_1.Nucleotide(n));
        return nucleos;
    }
    //gets the next nucleotide
    get nucleo() {
        return this.nucleos.pop();
    }
}
exports.Genome = Genome;
//# sourceMappingURL=genome.js.map