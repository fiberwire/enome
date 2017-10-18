import { Genome, Population, Selection } from '../../index';
import { ISumGenOptions } from './options';
import SumSpecimen from './sum-specimen';

export default class SumPopulation extends Selection<ISumGenOptions, number[]> {
  public createSpecimen(gen: Genome<ISumGenOptions>): SumSpecimen {
    return new SumSpecimen(gen);
  }
}
