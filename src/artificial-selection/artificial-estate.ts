import { IEvolvable, IGenomeOptions, ISpecimen } from '../index';

export interface IArtificialEState<Gen extends IGenomeOptions, Pheno> {
  specimens: Array<ISpecimen<Gen, Pheno>>;
  parents: Array<ISpecimen<Gen, Pheno>>;
}
