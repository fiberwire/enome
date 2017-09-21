import { IGenomeOptions, SpecimenPopulation } from '../index';

export interface IArtificialEState<Gen extends IGenomeOptions, Pheno> {
  population: SpecimenPopulation<Gen, Pheno>;
}
