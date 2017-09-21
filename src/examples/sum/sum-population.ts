import {
  Genome,
  IDataEvaluation,
  IOrganismOptions,
  ISpecimen,
  mutate,
  Organism,
  reproduceManyToOne,
  SpecimenPopulation,
} from '../../index';

import * as _ from 'lodash';
import { SumSpecimen } from '../specimen/sum-specimen';
import { ISumGenomeOptions } from './interfaces/sum-genome-options';

export class SumPopulation extends SpecimenPopulation<
  ISumGenomeOptions,
  number[]
> {
  public createSpecimen(options: ISumGenomeOptions): SumSpecimen {
    return new SumSpecimen(new Genome(options));
  }
  public reproduceSpecimen(parents: SumSpecimen[]): SumSpecimen {
    return new SumSpecimen(reproduceManyToOne(parents.map(p => p.genotype)));
  }
  public determineWorstParent(parents: SumSpecimen[]): SumSpecimen {
    return _.minBy(parents, p => p.fitness);
  }
}
