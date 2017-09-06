import * as _ from 'lodash';
import {
  IGenomeOptions,
  IOrganismOptions,
  IPopulationOptions,
  Organism,
} from '../index';

export function cloneOrganism<
  GenType extends IGenomeOptions,
  PopType extends IPopulationOptions,
  OrgType extends IOrganismOptions,
  DataType,
  PhenoType,
  AgentStateType,
  EnvStateType
>(
  org: Organism<
    GenType,
    PopType,
    OrgType,
    DataType,
    PhenoType,
    AgentStateType,
    EnvStateType
  >
): Organism<
  GenType,
  PopType,
  OrgType,
  DataType,
  PhenoType,
  AgentStateType,
  EnvStateType
> {
  return _.cloneDeep(org);
}
