import { IEvolvable, IGenomeOptions, ParentSpecimen, Specimen } from '../index';

export interface IArtificialEState<Gen extends IGenomeOptions, Pheno> {
  specimens: Array<Specimen<Gen, Pheno>>;
  parents: Array<ParentSpecimen<Gen, Pheno>>;
}
