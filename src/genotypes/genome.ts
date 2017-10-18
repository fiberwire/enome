import * as Chance from 'chance';
import * as _ from 'lodash';
import {
  Gene,
  GenomeRefill,
  IGenomeOptions,
  pad,
  weight,
  weights,
} from '../index';

const chance = new Chance();

export class Genome<T extends IGenomeOptions> {
  // the genes derived from the base values, consumed by gene property
  public genes: Gene[];

  private extended: number = 0;

  constructor(
    public options: T,
    public sequence?: number[],
    public idLength: number = Math.max(
      10,
      Math.round(Math.sqrt(options.genomeLength))
    )
  ) {
    // const { geneLength, refill } = options;

    // if (geneLength === undefined) {
    //   this.options.geneLength = 1;
    // }

    // if (refill === undefined) {
    //   this.options.refill = GenomeRefill.extend;
    // }

    const defaults = {
      geneLength: 1,
      refill: GenomeRefill.extend,
    };

    // tslint:disable-next-line:no-object-literal-type-assertion
    this.options = { ...defaults, ...this.options as object } as T;

    if (sequence === undefined) {
      this.sequence = pad(
        weights(options.genomeLength),
        this.options.geneLength
      );
    }

    this.genes = this.freshGenes;
  }

  // returns a string of lower and upper case letters which are determined by the genome
  get id(): string {
    const genes: Gene[] = this.freshGenes;
    let letters: string[];
    const numLetters: number = genes.length / this.idLength;
    letters = _.chunk(genes, numLetters)
      .slice(0, this.idLength) // group genes
      .map(
        (n: Gene[]) => n.reduce((a, b) => new Gene((a.value + b.value) / 2)) // average genes)
      )
      .map((n: Gene) => n.letter()); // interpolate letter from averaged genees

    // return string of letters
    return letters.reduce((a, b) => a + b);
  }

  // chunks values in sequence together into genes, determined by options.geneLength
  // the longer the genes are, the less sensitive to mutation they are.
  get freshGenes(): Gene[] {
    const genes = _.chunk(this.sequence, this.options.geneLength)
      .map(n => _.mean(n))
      .map(n => new Gene(n));
    return genes;
  }

  get extendedGenes(): Gene[] {
    const fresh = this.freshGenes;
    const c = new Chance(fresh[this.extended].value);

    const ext = fresh.map(f => {
      const g = new Gene(
        _.mean(
          _.range(this.options.geneLength).map(i =>
            c.floating({
              max: 1,
              min: 0,
            })
          )
        )
      );

      return g;
    });

    // loop extended back to 0 if it passes genomeLength
    if (this.extended + 1 < this.options.genomeLength) {
      this.extended += 1;
    } else {
      this.extended = 0;
    }

    return ext;
  }

  // gets the next gene
  get g(): Gene {
    if (this.genes.length === 0) {
      switch (this.options.refill) {
        case GenomeRefill.loop:
          this.genes = this.freshGenes;
          break;

        case GenomeRefill.none:
          throw new Error(`${this.id} ran out of genes`);

        case GenomeRefill.extend:
        default:
          // default to extend if refill isn't specified
          this.genes = this.extendedGenes;
      }
    }

    return this.genes.shift();
  }

  // gets the next n genes
  public gs(n: number): Gene[] {
    if (this.genes.length < n) {
      switch (this.options.refill) {
        case GenomeRefill.loop:
          this.genes = this.freshGenes;
          break;

        case GenomeRefill.none:
          throw new Error(`${this.id} ran out of genes`);

        case GenomeRefill.extend:
        default:
          // default to extend if refill isn't specified
          this.genes = this.extendedGenes;
      }
    }

    return _.range(n).map(i => this.g);
  }
}
