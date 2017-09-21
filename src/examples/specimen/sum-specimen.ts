import * as _ from 'lodash';
import { Genome, ISpecimen } from '../../index';
import { ISumOptions } from './sum-gen-options';

export class SumSpecimen implements ISpecimen<ISumOptions, number[]> {
  public phenotype: number[];
  public fitness: number;

  constructor(public genotype: Genome<ISumOptions>, public age: number = 0) {
    this.phenotype = this.createPhenotype(genotype);
  }

  public ageSpecimen(n: number): SumSpecimen {
    const genotype = this.genotype;
    const age = this.age + n;

    return new SumSpecimen(genotype, age);
  }
  public createPhenotype(genotype: Genome<ISumOptions>): number[] {
    return _.range(genotype.options.length).map(i =>
      genotype.g.int(genotype.options.min, genotype.options.max)
    );
  }
}
