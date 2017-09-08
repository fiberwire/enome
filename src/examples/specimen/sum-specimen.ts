import * as _ from 'lodash';
import { Genome, Specimen } from '../../index';
import { ISumOptions } from "./sum-gen-options";

export class SumSpecimen extends Specimen<ISumOptions, number[]> {
  public ageSpecimen(n: number): SumSpecimen {
    return new SumSpecimen(this.genotype, this.age + n);
  }
  public createPhenotype(genotype: Genome<ISumOptions>): number[] {
    return _.range(genotype.options.length).map(i =>
      genotype.g.int(genotype.options.min, genotype.options.max)
    );
  }
}
