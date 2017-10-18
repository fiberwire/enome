import * as _ from 'lodash';
import { Genome, IOrganism, ISpecimen } from '../../index';
import { ISumGenOptions } from './options';

export default class SumSpecimen
  implements IOrganism<ISumGenOptions, number[]> {
  public fitness: number;
  public evaluated: boolean = false;
  public age: number;

  public phenotype: number[];

  constructor(public genotype: Genome<ISumGenOptions>) {
    this.phenotype = this.createPhenotype(genotype);
  }

  public evaluate(): number {
    const { target } = this.genotype.options;
    const sum = _.sum(this.phenotype);

    const fitness = Math.abs(sum - target);

    this.fitness = fitness;
    this.evaluated = true;
    return fitness;
  }

  public createPhenotype(genotype: Genome<ISumGenOptions>): number[] {
    const g = genotype;
    const { min, max, length } = g.options;

    return _.range(length).map(i => g.g.int(min, max));
  }

  public ageSpecimen(n: number = 1): SumSpecimen {
    this.age += n;
    return this;
  }
}
