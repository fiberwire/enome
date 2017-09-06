import { IEvolvable, IGenomeOptions, Specimen } from '../index';

export interface IArtificialEState<Gen extends IGenomeOptions, Pheno> {
  specimens: Array<Specimen<Gen, Pheno>>;
  parents: Array<Specimen<Gen, Pheno>>;
}
