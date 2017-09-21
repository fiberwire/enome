import {
  ArtificialSelection,
  Genome,
  IArtificialEState,
  IArtificialOptions,
  ISpecimen,
  reproduceManyToOne,
} from '../../index';
import { SumPopulation } from '../sum/sum-population';
import { ISumOptions } from './sum-gen-options';
import { SumSpecimen } from './sum-specimen';

export class SumArtificial extends ArtificialSelection<ISumOptions, number[]> {
  constructor(
    public options: IArtificialOptions,
    public genOptions: ISumOptions
  ) {
    super(options, genOptions);
  }
  
  public getDefaultState(): IArtificialEState<ISumOptions, number[]> {
    return {
      population: this.createPopulation()
    };
  }
  
  public createSpecimen(options: ISumOptions): SumSpecimen {
    return new SumSpecimen(new Genome(options));
  }

  public createPopulation(): SumPopulation {
    return new SumPopulation(this.options, this.genOptions);
  }

  public reproduceSpecimen(parents: SumSpecimen[]): SumSpecimen {
    const genotypes = parents.map(p => p.genotype);
    const offspring = reproduceManyToOne(genotypes);
    return new SumSpecimen(offspring);
  }
}
