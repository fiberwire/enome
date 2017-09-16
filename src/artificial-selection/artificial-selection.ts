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
} from '../index';

import * as _ from 'lodash';

export abstract class ArtificialSelection<
  Gen extends IGenomeOptions,
  Pheno
> extends AgentEnvironment<IArtificialAState, IArtificialEState<Gen, Pheno>> {
  public specimens: ReactiveCollection<ISpecimen<Gen, Pheno>>;
  public parents: ReactiveCollection<ISpecimen<Gen, Pheno>>;

  constructor(public options: IArtificialOptions, public genOptions: Gen) {
    super(options);
    this.nextState({
      index: 0,
      state: {
        parents: this.fillParents(),
        specimens: this.fillSpecimens(),
      },
    });

    this.specimens = new ReactiveCollection<ISpecimen<Gen, Pheno>>();
    this.parents = new ReactiveCollection<ISpecimen<Gen, Pheno>>();

    this.subs.add(this.syncSpecimens());
  }

  public async interact(
    interaction: IAgentUpdate<IArtificialAState>
  ): Promise<IStateUpdate<IArtificialEState<Gen, Pheno>>> {
    const state = this.currentState.state;
    const { specimens, parents } = state;
    const cmds = interaction.state.cmds;

    const keeps = cmds
      .filter(c => c.op === ArtificialOp.keep)
      .map(c => state.specimens[c.index]);

    const kills = cmds
      .filter(c => c.op === ArtificialOp.kill)
      .map(c => state.specimens[c.index]);

    const randoms = cmds
      .filter(c => c.op === ArtificialOp.randomize)
      .map(c => state.specimens[c.index]);

    const kept = this.keepSpecimens(specimens, parents, keeps);
    const killed = this.killSpecimens(kept.specimens, kept.parents, kills);
    const randomized = this.randomizeSpecimens(killed, kept.parents, randoms);

    return {
      index: this.index + 1,
      state: {
        parents: kept.parents,
        specimens: randomized,
      },
    };
  }

  public get defaultState(): IArtificialEState<Gen, Pheno> {
    return {
      parents: [],
      specimens: [],
    };
  }

  get initialState(): IStateUpdate<IArtificialEState<Gen, Pheno>> {
    return {
      index: -1,
      state: this.defaultState,
    };
  }

  /**
   * creates a new randomly generated ISpecimen
   *
   * @private
   * @returns {ISpecimen<Gen, Pheno>}
   * @memberof ArtificialSelection
   */
  public abstract createSpecimen(options: Gen): ISpecimen<Gen, Pheno>;

  /**
   * creates an offspring of all parents
   *
   * @private
   * @returns {ISpecimen<Gen, Pheno>}
   * @memberof ArtificialSelection
   */
  public abstract reproduceSpecimen(
    parents: Array<ISpecimen<Gen, Pheno>>
  ): ISpecimen<Gen, Pheno>;

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

  /**
   * fills the provided array of specimens with new randomly generated specimens
   *
   * @private
   * @param {Array<ISpecimen<Gen, Pheno>>} [specs=[]]
   * @returns {Array<ISpecimen<Gen, Pheno>>}
   * @memberof ArtificialSelection
   */
  private fillSpecimens(
    specs: Array<ISpecimen<Gen, Pheno>> = [],
    n: number = this.options.specimens
  ): Array<ISpecimen<Gen, Pheno>> {
    const newSpecs = _.range(n - specs.length).map(i =>
      this.createSpecimen(this.genOptions)
    );

    return specs.concat(newSpecs);
  }

  /**
   * fills the provided array of parents with new randomly generated parents
   *
   * @private
   * @param {Array<IParentSpecimen<Gen, Pheno>>} [parents=[]]
   * @param {number} [n=this.options.parents]
   * @returns {Array<IParentSpecimen<Gen, Pheno>>}
   * @memberof ArtificialSelection
   */
  private fillParents(
    parents: Array<ISpecimen<Gen, Pheno>> = [],
    n: number = this.options.parents
  ): Array<ISpecimen<Gen, Pheno>> {
    const newParents = _.range(n - parents.length).map(i =>
      this.createSpecimen(this.genOptions)
    );

    return parents.concat(newParents);
  }

  /**
   * fills the provided array of specimens with the offspring of all parents
   *
   * @private
   * @param {Array<ISpecimen<Gen, Pheno>>} specs - the array of specimens you want to fill with offspring
   * @returns {Array<ISpecimen<Gen, Pheno>>}
   * @memberof ArtificialSelection
   */
  private reproduceSpecimens(
    specs: Array<ISpecimen<Gen, Pheno>>,
    parents: Array<ISpecimen<Gen, Pheno>>,
    n: number = this.options.specimens
  ): Array<ISpecimen<Gen, Pheno>> {
    const offspring = _.range(n - specs.length).map(i =>
      this.reproduceSpecimen(parents)
    );

    return specs.concat(offspring);
  }

  private syncSpecimens(): Subscription {
    return this.states.subscribe(s => {
      this.specimens.value = s.state.specimens;
      this.parents.value = s.state.parents;
    });
  }

  private ageSpecimens(
    specs: Array<ISpecimen<Gen, Pheno>>
  ): Array<ISpecimen<Gen, Pheno>> {
    return specs.map(s => s.ageSpecimen(1));
  }

  private killSpecimens(
    specs: Array<ISpecimen<Gen, Pheno>>,
    parents: Array<ISpecimen<Gen, Pheno>>,
    kill: Array<ISpecimen<Gen, Pheno>>
  ): Array<ISpecimen<Gen, Pheno>> {
    const killed = _.without(specs, ...kill);
    return this.reproduceSpecimens(killed, parents);
  }

  private keepSpecimens(
    specs: Array<ISpecimen<Gen, Pheno>>,
    parents: Array<ISpecimen<Gen, Pheno>>,
    keep: Array<ISpecimen<Gen, Pheno>>
  ): {
    parents: Array<ISpecimen<Gen, Pheno>>;
    specimens: Array<ISpecimen<Gen, Pheno>>;
  } {
    const keptParents = _.take(
      _.sortBy(_.concat(this.ageSpecimens(parents), keep), p => p.age),
      this.options.parents
    );

    return {
      parents: keptParents,
      specimens: _.without(specs, ...keep),
    };
  }

  private randomizeSpecimens(
    specs: Array<ISpecimen<Gen, Pheno>>,
    parents: Array<ISpecimen<Gen, Pheno>>,
    randomize: Array<ISpecimen<Gen, Pheno>>
  ): Array<ISpecimen<Gen, Pheno>> {
    return this.fillSpecimens(_.without(specs, ...randomize));
  }
}
