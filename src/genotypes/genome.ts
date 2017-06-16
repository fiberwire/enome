import * as Chance from "chance";
import * as _ from "lodash";
import {
    Gene,
    IGenomeOptions,
    value,
    values,
} from "../index";

const chance = new Chance();

export class Genome<T extends IGenomeOptions> {

    // the genes derived from the base values, consumed by gene property
    public genes: Gene[];

    constructor(
        public options: T,
        public sequence: number[] = values(options.genomeLength * options.geneLength),
        public idLength: number = Math.min(12, options.genomeLength),
    ) {
        this.genes = this.freshGenes;
    }

    // returns a string of lower and upper case letters which are determined by the genome
    get id(): string {
        const nucleos: Gene[] = this.freshGenes;
        let letters: string[];
        const numLetters: number = nucleos.length / this.idLength;
        letters = _
            .chunk(nucleos, numLetters).slice(0, this.idLength) // group genes
            .map((n: Gene[]) =>
                n.reduce((a, b) => new Gene((a.value + b.value) / 2)), // average genes)
        )
            .map((n: Gene) => n.letter()); // interpolate letter from averaged genees

        // return string of letters
        return letters.reduce((a, b) => a + b);
    }

    // chunks values in sequence together into genes, determined by options.geneLength
    // the longer the genes are, the less sensitive to mutation they are.
    get freshGenes(): Gene[] {
        const nucleos = _
            .chunk(this.sequence, this.options.geneLength)
            .map((n) => _.reduce(n, (memo, num) => memo + num, 0) / n.length || 1)
            .map((n) => new Gene(n));
        return nucleos;
    }

    // gets the next gene
    get g(): Gene {
        if (this.genes.length === 0) {
            if (this.options.loopGenes) {
                this.genes = this.freshGenes;
            } else {
                throw new Error((`${this.id} ran out of genes`));
            }
        }

        return this.genes.shift();
    }

    // gets the next n genes
    public gs(n: number): Gene[] {
        if (this.genes.length < n) {
            if (this.options.loopGenes) {
                this.genes = this.freshGenes;
            } else {
                throw new Error((`${this.id} ran out of genes`));
            }
        }

        return _.range(n).map((i) => this.g);
    }
}
