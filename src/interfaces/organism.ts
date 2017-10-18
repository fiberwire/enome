import { IEvolvable, IGenomeOptions, ISpecimen } from '../index';

export interface IOrganism<Gen extends IGenomeOptions, Pheno>
  extends ISpecimen<Gen, Pheno>,
    IEvolvable<Pheno> {}
