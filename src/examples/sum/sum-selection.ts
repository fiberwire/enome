import {
  IGenomeOptions,
  IPopulationOptions,
  ISpecimen,
  NaturalSelection,
  SpecimenPopulation,
} from '../../index';
import { ISumOptions } from '../specimen/sum-gen-options';
import { SumSpecimen } from '../specimen/sum-specimen';
import { ISumGenomeOptions } from './interfaces/sum-genome-options';
import { SumPopulation } from './sum-population';

export class SumSelection extends NaturalSelection<ISumOptions, number[]> {
  public createPopulation(
    popOptions: IPopulationOptions,
    genOptions: ISumOptions
  ): SumPopulation {
    return new SumPopulation(popOptions, genOptions);
  }
  public evaluate(specimen: SumSpecimen): number {
    throw new Error('Method not implemented.');
  }
}
