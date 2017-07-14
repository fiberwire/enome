import { Genome } from "../genotypes/genome";
import { IGenomeOptions } from "../options/genome-options";

export interface IEvaluation<OrganismType, PhenoType> {
    fitness: number;
    organism: OrganismType;
}
