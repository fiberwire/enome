import * as Chance from 'chance';
import * as _ from 'lodash';
import { Nucleotide } from './nucleotide';
import { GenomeOptions, value } from "../index";
import { mutate } from "../operators/mutation/mutate";
import { values } from "../operators/values";

const chance = new Chance();


export class Genome<T extends GenomeOptions> {

    //the nucleotides derived from the base values, consumed by nucleo property
    nucleos: Nucleotide[];

    constructor(
        public options: T,
        public sequence: number[] = values(options.genomeLength * options.nucleotideLength),
        public idLength: number = Math.min(12, options.genomeLength)
    ) {
        this.nucleos = this.nucleotides;
    }

    // returns a string of lower and upper case letters which are determined by the genome
    get id(): string {
        let nucleos: Nucleotide[] = this.nucleotides;
        let letters: string[];
        let numLetters: number = nucleos.length / this.idLength;
        letters = _
            .chunk(nucleos, numLetters).slice(0, this.idLength) //group nucleotides
            .map((n: Nucleotide[]) =>
                n.reduce((a: Nucleotide, b: Nucleotide) => new Nucleotide((a.value + b.value) / 2)) //average nucleotides)
            )
            .map((n: Nucleotide) => n.letter()); //interpolate letter from averaged nucleotides


        //return string of letters
        return letters.reduce((a, b) => a + b);
    }

    //chunks values in sequence together into nucleotides, determined by options.nucleotideLength
    //the longer the nucleotides are, the less sensitive to mutation they are.
    get nucleotides(): Nucleotide[] {
        let nucleos = _
            .chunk(this.sequence, this.options.nucleotideLength)
            .map(n => _.reduce(n, (memo, num) => memo + num, 0) / n.length || 1)
            .map(n => new Nucleotide(n));
        return nucleos;
    }

    //gets the next nucleotide
    get nucleo(): Nucleotide {
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
    nuclei(n: number): Nucleotide[] {
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