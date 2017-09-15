import { AgentEnvironment, IAgentUpdate, IStateUpdate } from 'enviro-rx';
import { Subscription } from 'rxjs';
import {
  ArtificialCmd,
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
    const { cmd, specimenIndex } = interaction.state;
    const spec = state.specimens[specimenIndex];
    const agedParents = state.parents.map(p => p.ageSpecimen(1));
    const withoutSpec = _.without(state.specimens, spec);

    if (cmd === ArtificialCmd.kill) {
      const parents = agedParents;
      const specimens = this.reproduceSpecimens(withoutSpec, parents);

      return {
        index: this.index + 1,
        state: {
          parents,
          specimens,
        },
      };
    } else if (cmd === ArtificialCmd.keep) {
      const concatted = _.concat(agedParents, spec); // add spec to parents
      const sorted = _.sortBy(concatted, p => p.age); // sort parents by age
      const parents = _.take(sorted, this.options.parents); // don't take old parents that exceed the parent limit

      const specimens = this.reproduceSpecimens(withoutSpec, parents);

      return {
        index: this.index + 1,
        state: {
          parents,
          specimens,
        },
      };
    } else if (cmd === ArtificialCmd.randomize) {
      const parents = agedParents;
      const specimens = this.fillSpecimens(withoutSpec);

      return {
        index: this.index + 1,
        state: {
          parents,
          specimens,
        },
      };
    }
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
  public kill(i: number = 0): void {
    this.nextInteraction({
      agentID: 'env',
      index: this.index + 1,
      state: {
        cmd: ArtificialCmd.kill,
        specimenIndex: i,
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
  public keep(i: number = 0): void {
    this.nextInteraction({
      agentID: 'env',
      index: this.index + 1,
      state: {
        cmd: ArtificialCmd.keep,
        specimenIndex: i,
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
  public randomize(i: number = 0): void {
    this.nextInteraction({
      agentID: 'env',
      index: this.index + 1,
      state: {
        cmd: ArtificialCmd.randomize,
        specimenIndex: i,
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
    })
  }
}
