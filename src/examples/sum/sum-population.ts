import { Genome, Population, Selection } from '../../index';
import { ISumGenOptions } from './options';
import SumOrganism from './sum-organism';

export default class SumPopulation extends Selection<ISumGenOptions, number[]> {
  public createSpecimen(gen: Genome<ISumGenOptions>): SumOrganism {
    return new SumOrganism(gen);
  }
}
