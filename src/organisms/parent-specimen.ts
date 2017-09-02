
import { Genome, IGenomeOptions, Specimen } from "../index";

export abstract class ParentSpecimen<Gen extends IGenomeOptions, Pheno> extends Specimen<Gen, Pheno> {
    public age: number;
    public abstract createPhenotype(genotype: Genome<Gen>): Pheno;
}