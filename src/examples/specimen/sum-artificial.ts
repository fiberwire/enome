import {
  ArtificialSelection,
  Genome,
  IArtificialOptions,
  reproduceManyToOne,
  Specimen,
} from '../../index';
import { ISumOptions } from './sum-gen-options';
import { SumSpecimen } from './sum-specimen';

export class SumArtificial extends ArtificialSelection<ISumOptions, number[]> {
  constructor(
    public options: IArtificialOptions,
    public genOptions: ISumOptions
  ) {
    super(options);
  }
  public createSpecimen(): Specimen<ISumOptions, number[]> {
    return new SumSpecimen(new Genome(this.genOptions));
  }
  public reproduceSpecimen(
    parents: Array<Specimen<ISumOptions, number[]>>
  ): Specimen<ISumOptions, number[]> {
    const genotypes = parents.map(p => p.genotype);
    const offspring = reproduceManyToOne(genotypes);
    return new SumSpecimen(offspring);
  }
}
