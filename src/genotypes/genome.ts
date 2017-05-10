import * as Chance from 'chance';
import * as _ from 'lodash';
import { Nucleotide } from './nucleotide';
import { EnomeOptions } from "./options";

const chance = new Chance();
export class Genome<T extends EnomeOptions> {

    //the nucleotides derived from the base values
    nucleos: Nucleotide[];

    constructor(
        public options: T,
        public sequence: number[] = null,
        public idLength: number = 12
    ) {
        if (this.sequence == null) {
            this.sequence = this.randomValues(this.options.genomeLength * this.options.nucleotideLength);
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

    //returns n random values between 0 and 1
    randomValues(n): number[] {
        const values = [];

        for (let i = 0; i < n; i++) {
            values.unshift(this.value);
        }

        return values;
    }

    get value(): number {
        return chance.floating({ min: 0, max: 1 });
    }

    sub(gen: Genome<T>, mutateChance: number): Genome<T> {
        return new Genome(
            gen.options,
            gen.sequence.map(value => {
                if (this.value <= mutateChance) {
                    return this.value;
                }
                else {
                    return value;
                }
            }));
    }

    avg(gen: Genome<T>, mutateChance: number): Genome<T> {
        return new Genome(
            gen.options,
            gen.sequence.map(value => {
                if (this.value <= mutateChance) {
                    return (this.value + value) / 2
                }
                else {
                    return value;
                }
            })
        )
    }

    mutate(mutateChance: number, type: string = 'sub'): Genome<T> {
        let mutated: Genome<T>;
        let mutSeq: number[];

        switch (type) {
            case 'sub':
                return this.sub(this, mutateChance);
            case 'avg':
                return this.avg(this, mutateChance);
            default:
                return this.sub(this, mutateChance);
        }
    }

    reproduce(other: Genome<T>, w1: number = 1, w2: number = 1, mutateChance: number = 0.05): Genome<T> {
        return new Genome<T>(
            this.options,
            _.zip(this.sequence, other.sequence)
                .map((values: number[]) => {
                    //console.log(`w1: ${w1}, w2: ${w2}`);
                    let v = chance.weighted(values, [w1, w2]);
                    return v;
                }))
            .mutate(mutateChance, 'avg');
    }

    reproduceManyToOne(genomes: Genome<T>[], weights: number[]): Genome<T> {
        let offspringSeq: number[] = _.zip(genomes.map(g => g.sequence))
            .map((sequences: number[][]) => {
                return chance.weighted(
                    chance.weighted(sequences, weights),
                    weights);
            });

        return new Genome(
            chance.weighted(genomes, weights).options,
            offspringSeq
        );
    }
}