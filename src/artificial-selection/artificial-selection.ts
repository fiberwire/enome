import { AgentEnvironment, IAgentUpdate, IStateUpdate } from 'enviro-rx';
import { Subscription } from 'rxjs';
import {
  ArtificialOp,
  Genome,
  IArtificialAState,
  IArtificialEState,
  IArtificialOptions,
  IGenomeOptions,
  ISpecimen,
  ReactiveCollection,
  SpecimenPopulation,
} from '../index';

import * as _ from 'lodash';

export abstract class ArtificialSelection<
  Gen extends IGenomeOptions,
  Pheno
> extends AgentEnvironment<IArtificialAState, IArtificialEState<Gen, Pheno>> {
  public population: SpecimenPopulation<Gen, Pheno>;

  constructor(
    public options: IArtificialOptions,
    public genOptions: Gen
  ) {
    super(options);
  }

  public abstract createPopulation(): SpecimenPopulation<Gen, Pheno>;

  public async interact(
    interaction: IAgentUpdate<IArtificialAState>
  ): Promise<IStateUpdate<IArtificialEState<Gen, Pheno>>> {
    const state = this.currentState.state;
    const { specimens, parents } = state.population;
    const cmds = interaction.state.cmds;

    const keeps = cmds
      .filter(c => c.op === ArtificialOp.keep)
      .map(c => specimens.value[c.index]);

    const kills = cmds
      .filter(c => c.op === ArtificialOp.kill)
      .map(c => specimens.value[c.index]);

    const randoms = cmds
      .filter(c => c.op === ArtificialOp.randomize)
      .map(c => specimens.value[c.index]);

    keeps.forEach(k => this.population.keep(k));
    kills.forEach(k => this.population.kill(k));
    randoms.forEach(r => this.population.randomize(r));

    return {
      index: this.index + 1,
      state: {
        population: this.population,
      },
    };
  }

  /**
   * Sends an interaction to the environment that kills the specimen with the given index
   * The killed specimen will be replaced with a new offspring of the parents
   * 
   * @param {number} [i=0]  - index of the specimen you want to kill
   * @memberof ArtificialSelection
   */
  public kill(indices: number[] = [0]): void {
    const cmds = indices.map(i => {
      return {
        index: i,
        op: ArtificialOp.kill,
      };
    });

    this.nextInteraction({
      agentID: 'env',
      index: this.index + 1,
      state: {
        cmds,
      },
    });
  }

  /**
   * Sends an interaction to the environment that keeps the specimen with the given index as a parent
   * the new parent will be replaced with a new offspring (including the new one)
   * 
   * @param {number} [i=0] - the index of the specimen you want to keep as a parent
   * @memberof ArtificialSelection
   */
  public keep(indices: number[] = [0]): void {
    const cmds = indices.map(i => {
      return {
        index: i,
        op: ArtificialOp.keep,
      };
    });

    this.nextInteraction({
      agentID: 'env',
      index: this.index + 1,
      state: {
        cmds,
      },
    });
  }

  /**
   * Send an interaction to the environment that replaces the specimen 
   * with the given index with a randomly generated one.
   * 
   * @param {number} [i=0] - the index of the specimen you want to replace
   * @memberof ArtificialSelection
   */
  public randomize(indices: number[] = [0]): void {
    const cmds = indices.map(i => {
      return {
        index: i,
        op: ArtificialOp.randomize,
      };
    });

    this.nextInteraction({
      agentID: 'env',
      index: this.index + 1,
      state: {
        cmds,
      },
    });
  }
}
