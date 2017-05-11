import * as Chance from 'chance';
import * as _ from 'lodash';
import { Nucleotide } from './nucleotide';
import { GenomeOptions, value } from "../index";
import { mutate } from "../operators/mutation/mutate";
import { values } from "../operators/values";

const chance = new Chance();


export class Genome<T extends GenomeOptions> {

    //the nucleotides derived from the base values
    nucleos: Nucleotide[];

    constructor(
        public options: T,
        public sequence: number[] = null,
        public idLength: number = 12
    ) {
        if (this.sequence == null) {
            this.sequence = values(this.options.genomeLength * this.options.nucleotideLength);
        }

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
                n.reduce((p: Nucleotide, n: Nucleotide) => new Nucleotide((p.value + n.value) / 2)) //average nucleotides)
            )
            .map((n: Nucleotide) => n.letter());


        //return string of letters
        return letters.reduce((p, n) => p + n);
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
        return this.nucleos.pop();
    }
}