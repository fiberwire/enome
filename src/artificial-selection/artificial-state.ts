import {
  IEvolvable,
  IGenomeOptions,
  IParentSpecimen,
  Specimen,
} from '../index';

export interface IArtificialEState<Gen extends IGenomeOptions, Pheno> {
  specimens: Array<Specimen<Gen, Pheno>>;
  parents: Array<IParentSpecimen<Gen, Pheno>>;
}
