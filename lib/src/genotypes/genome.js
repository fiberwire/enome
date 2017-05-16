"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chance = require("chance");
const _ = require("lodash");
const nucleotide_1 = require("./nucleotide");
const values_1 = require("../operators/values");
const chance = new Chance();
class Genome {
    constructor(options, sequence = values_1.values(options.genomeLength * options.nucleotideLength), idLength = Math.min(12, options.genomeLength)) {
        this.options = options;
        this.sequence = sequence;
        this.idLength = idLength;
        this.nucleos = this.nucleotides;
    }
    // returns a string of lower and upper case letters which are determined by the genome
    get id() {
        let nucleos = this.nucleotides;
        let letters;
        let numLetters = nucleos.length / this.idLength;
        letters = _
            .chunk(nucleos, numLetters).slice(0, this.idLength) //group nucleotides
            .map((n) => n.reduce((a, b) => new nucleotide_1.Nucleotide((a.value + b.value) / 2)) //average nucleotides)
        )
            .map((n) => n.letter()); //interpolate letter from averaged nucleotides
        //return string of letters
        return letters.reduce((a, b) => a + b);
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
        if (this.nucleos.length == 0) {
            if (this.options.extendNucleotides) {
                this.nucleos = this.nucleotides;
            }
            else {
                throw (`${this.id} ran out of nucleos`);
            }
        }
        return this.nucleos.shift();
    }
    //gets the next n nucleotides
    nuclei(n) {
        if (this.nucleos.length < n) {
            if (this.options.extendNucleotides) {
                this.nucleos = this.nucleotides;
            }
            else {
                throw (`${this.id} ran out of nucleos`);
            }
        }
        return _.range(n).map(i => this.nucleo);
    }
}
exports.Genome = Genome;
//# sourceMappingURL=genome.js.map