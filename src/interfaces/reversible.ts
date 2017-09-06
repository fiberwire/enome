import { Genome, IGenomeOptions } from '../index';

export interface IReversible<Gen extends IGenomeOptions, Pheno> {
  genotype: Genome<Gen>;
  phenotype: Pheno;
  createGenotype(phenotype: Pheno): Genome<Gen>;
}
