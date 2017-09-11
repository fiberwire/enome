import { AgentEnvironment, IAgentUpdate, IStateUpdate } from 'enviro-rx';
import {
  ArtificialCmd,
  Genome,
  IArtificialAState,
  IArtificialEState,
  IArtificialOptions,
  IGenomeOptions,
  ISpecimen,
  reproduceManyToOne,
} from '../index';

import * as _ from 'lodash';

export abstract class ArtificialSelection<
  Gen extends IGenomeOptions,
  Pheno
> extends AgentEnvironment<IArtificialAState, IArtificialEState<Gen, Pheno>> {
  constructor(public options: IArtificialOptions, public genOptions: Gen) {
    super(options);
    this.nextState({
      index: 0,
      state: {
        parents: this.fillParents(),
        specimens: this.fillSpecimens()
      }
    })
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

  // get initialState(): IStateUpdate<IArtificialEState<Gen, Pheno>> {
  //   return {
  //     index: 0,
  //     state: this.defaultState
  //   }
  // }

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
}
