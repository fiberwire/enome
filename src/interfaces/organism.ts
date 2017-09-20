import { IAgent } from 'enviro-rx';
import {
  IGenomeOptions,
  INaturalAState,
  INaturalEState,
  ISpecimen,
} from '../index';

// tslint:disable-next-line:no-empty-interface
export interface IOrganism<
  Gen extends IGenomeOptions,
  Pheno extends IAgent<AState, EState>,
  AState, EState>
  extends ISpecimen<Gen, Pheno> { }
