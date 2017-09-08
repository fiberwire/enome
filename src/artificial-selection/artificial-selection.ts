import { AgentEnvironment, IAgentUpdate, IStateUpdate } from 'enviro-rx';
import {
  ArtificialCmd,
  Genome,
  IArtificialAState,
  IArtificialEState,
  IArtificialOptions,
  IGenomeOptions,
  reproduceManyToOne,
  Specimen,
} from '../index';

import * as _ from 'lodash';

export abstract class ArtificialSelection<
  Gen extends IGenomeOptions,
  Pheno
> extends AgentEnvironment<IArtificialAState, IArtificialEState<Gen, Pheno>> {
  constructor(public options: IArtificialOptions) {
    super(options);
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
      parents: this.fillParents(),
      specimens: this.fillSpecimens(),
    };
  }

  /**
   * creates a new randomly generated specimen
   *
   * @private
   * @returns {Specimen<Gen, Pheno>}
   * @memberof ArtificialSelection
   */
  public abstract createSpecimen(): Specimen<Gen, Pheno>;

  /**
   * creates an offspring of all parents
   *
   * @private
   * @returns {Specimen<Gen, Pheno>}
   * @memberof ArtificialSelection
   */
  public abstract reproduceSpecimen(
    parents: Array<Specimen<Gen, Pheno>>
  ): Specimen<Gen, Pheno>;

  /**
   * fills the provided array of specimens with new randomly generated specimens
   *
   * @private
   * @param {Array<Specimen<Gen, Pheno>>} [specs=[]]
   * @returns {Array<Specimen<Gen, Pheno>>}
   * @memberof ArtificialSelection
   */
  private fillSpecimens(
    specs: Array<Specimen<Gen, Pheno>> = [],
    n: number = this.options.specimens
  ): Array<Specimen<Gen, Pheno>> {
    const newSpecs = _.range(n - specs.length).map(i => this.createSpecimen());

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
    parents: Array<Specimen<Gen, Pheno>> = [],
    n: number = this.options.parents
  ): Array<Specimen<Gen, Pheno>> {
    const newParents = _.range(n - parents.length).map(i =>
      this.createSpecimen()
    );

    return parents.concat(newParents);
  }

  /**
   * fills the provided array of specimens with the offspring of all parents
   *
   * @private
   * @param {Array<Specimen<Gen, Pheno>>} specs - the array of specimens you want to fill with offspring
   * @returns {Array<Specimen<Gen, Pheno>>}
   * @memberof ArtificialSelection
   */
  private reproduceSpecimens(
    specs: Array<Specimen<Gen, Pheno>>,
    parents: Array<Specimen<Gen, Pheno>>,
    n: number = this.options.specimens
  ): Array<Specimen<Gen, Pheno>> {
    const offspring = _.range(n - specs.length).map(i =>
      this.reproduceSpecimen(parents)
    );

    return specs.concat(offspring);
  }
}
