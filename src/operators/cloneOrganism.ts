import { IAgent } from 'enviro-rx';
import * as _ from 'lodash';
import {
  IGenomeOptions,
  IOrganismOptions,
  IPopulationOptions,
  Organism,
} from '../index';

export function cloneOrganism<
  Gen extends IGenomeOptions,
  Pop extends IPopulationOptions,
  Org extends IOrganismOptions,
  Data,
  Pheno extends IAgent<AState, EState>,
  AState,
  EState
>(
  org: Organism<Gen, Pop, Org, Data, Pheno, AState, EState>
): Organism<Gen, Pop, Org, Data, Pheno, AState, EState> {
  return _.cloneDeep(org);
}
