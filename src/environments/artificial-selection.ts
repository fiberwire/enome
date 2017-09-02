import { AgentEnvironment, IAgentUpdate, IStateUpdate } from 'enviro-rx';
import { IArtificialEState, IGenomeOptions } from '../index';

export abstract class ArtificialSelection<
  Gen extends IGenomeOptions,
  Pheno,
  AState,
  EState extends IArtificialEState<Gen, Pheno>
> extends AgentEnvironment<AState, EState> {}
