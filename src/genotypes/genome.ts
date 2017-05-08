import * as Chance from 'chance';
import * as _ from 'lodash';
import { Nucleotide } from './nucleotide';
import { EnomeOptions } from "./options";

const chance = new Chance();
export class Genome {

    sequence: number[];
    nucleos: Nucleotide[];

    constructor(public options: EnomeOptions, public idLength: number = 12) {

        this.options = options;
        this.sequence = this.randomValues(options.genomeLength);
        this.nucleos = this.nucleotides;
    }

    get id(): string {
        let nucleos: Nucleotide[] = this.nucleotides;
        let letters: string[];
        let numLetters: number = nucleos.length / this.idLength;
        letters = _
            .chunk(nucleos, numLetters) //group nucleotides
            .map((n: Nucleotide[]) =>
                n.reduce((p: Nucleotide, n: Nucleotide) => new Nucleotide((p.value + n.value) / 2)) //average nucleotides)
            )
            .map((n: Nucleotide) => n.interpolateLetter());


        //return string of letters
        return letters.reduce((p, n) => p + n);
    }

    get nucleotides(): Nucleotide[] {
        let nucleos = _
            .chunk(this.sequence, this.options.nucleotideLength)
            .map(n => _.reduce(n, (memo, num) => memo + num, 0) / n.length || 1)
            .map(n => new Nucleotide(n));
        return nucleos;
    }

    get nucleo(): Nucleotide {
        return this.nucleos.pop();
    }

    randomValues(n): number[] {
        const values = [];

        for (let i = 0; i < n; i++) {
            values.unshift(chance.floating({ min: 0, max: 1 }));
        }

        return values;
    }
};