import { AgentEnvironment, IAgentUpdate, IStateUpdate } from 'enviro-rx';
import { IArtificialAState, IArtificialEState, IGenomeOptions } from '../index';

export abstract class ArtificialSelection<
  Gen extends IGenomeOptions,
  Pheno,
  AState extends IArtificialAState,
  EState extends IArtificialEState<Gen, Pheno>
> extends AgentEnvironment<AState, EState> {}
