import { Genome, IGenomeOptions, Specimen } from '../index';

export interface IParentSpecimen<Gen extends IGenomeOptions, Pheno>
  extends Specimen<Gen, Pheno> {
  age: number;
}
