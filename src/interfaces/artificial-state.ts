import { IEvolvable, IGenomeOptions } from '../index';

export interface IArtificialEState<Gen extends IGenomeOptions, Pheno> {
  specimens: Array<IEvolvable<Gen, Pheno>>;
  parents: Array<IEvolvable<Gen, Pheno>>;
}
