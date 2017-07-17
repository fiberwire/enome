import * as _ from "lodash";
import { Genome } from "../genotypes/genome";
import { IGenomeOptions } from "../options/genome-options";
import { IPopulationOptions } from "../options/population-options";
import { Organism } from "../organisms/organism";

export function cloneOrganism<
GenType extends IGenomeOptions, PopType extends IPopulationOptions, DataType, PhenoType, EnvStateType>(
    org: Organism<GenType, PopType, DataType, PhenoType, EnvStateType>):
    Organism<GenType, PopType, DataType, PhenoType, EnvStateType> {
    return _.cloneDeep(org);
}
