import * as _ from 'lodash';
import { Genome, IGenomeOptions, Specimen } from '../../src/index';

interface IListOptions extends IGenomeOptions {
  length: number;
  min: number;
  max: number;
}

class ListSpecimen extends Specimen<IListOptions, number[]> {
  public createPhenotype(genotype: Genome<IListOptions>): number[] {
    const g = genotype;
    const o = g.options;

    return _.range(o.length).map(i => g.g.int(o.min, o.max));
  }

  public ageSpecimen(n: number): Specimen<IListOptions, number[]> {
    return new ListSpecimen(this.genotype, this.age + n);
  }
}

let l: ListSpecimen;

beforeAll(() => {
  l = new ListSpecimen(
    new Genome({
      geneLength: 1,
      genomeLength: 10,
      length: 5,
      max: 100,
      min: 1,
    })
  );
});

describe('specimen', () => {
  it('should create a specimen', () => {
    expect(l).toBeDefined();
  });

  it('should have a genotype and phenotype', () => {
    expect(l.phenotype).toBeDefined();
    expect(l.phenotype.length).toBe(5);

    expect(l.genotype).toBeDefined();
    expect(l.genotype.sequence.length).toBe(10);
  });

  describe('ageSpecimen', () => {
    it('should return a specimen with an increased age', () => {
      const n = 1;
      const aged: ListSpecimen = l.ageSpecimen(n);

      expect(aged).toBeDefined();
      expect(aged.age).toBeDefined();
      expect(aged.age).toBeGreaterThan(l.age);
    });
  });

  describe('createPhenotype', () => {
    it('should turn a genome into a list of numbers', () => {
      const list = l.createPhenotype(l.genotype);

      expect(list).toBeDefined();
      expect(list.length).toBe(5);
    });
  });
});
