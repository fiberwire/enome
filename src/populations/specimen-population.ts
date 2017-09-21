import { ReactiveCollection } from 'enviro-rx';
import * as _ from 'lodash';
import { IGenomeOptions, IPopulationOptions, ISpecimen } from '../index';

export abstract class SpecimenPopulation<Gen extends IGenomeOptions, Pheno> {
  public specimens: ReactiveCollection<ISpecimen<Gen, Pheno>>;
  public parents: ReactiveCollection<ISpecimen<Gen, Pheno>>;

  constructor(public options: IPopulationOptions, public genOptions: Gen) {
    this.parents = this.fillParents();
    this.specimens = this.fillSpecimens();
  }

  /**
     * creates a new randomly generated ISpecimen
     * 
     * @abstract
     * @param {Gen} options
     * @returns {ISpecimen<Gen, Pheno>} 
     * @memberof SpecimenPopulation
     */
  public abstract createSpecimen(options: Gen): ISpecimen<Gen, Pheno>;

  /**
     * creates an offspring from parents
     * 
     * @abstract
     * @param {Array<ISpecimen<Gen, Pheno>>} parents 
     * @returns {ISpecimen<Gen, Pheno>} 
     * @memberof SpecimenPopulation
     */
  public abstract reproduceSpecimen(
    parents: Array<ISpecimen<Gen, Pheno>>
  ): ISpecimen<Gen, Pheno>;

  public abstract determineWorstParent(
    parents: Array<ISpecimen<Gen, Pheno>>
  ): ISpecimen<Gen, Pheno>;

  /**
     * adds the specimen to parents, replaces it with a new offspring
     * 
     * @param {ISpecimen<Gen, Pheno>} [specimen=this.specimens.value[0]] 
     * @returns {SpecimenPopulation<Gen, Pheno>} 
     * @memberof SpecimenPopulation
     */
  public keep(
    specimen: ISpecimen<Gen, Pheno> = this.specimens.value[0]
  ): SpecimenPopulation<Gen, Pheno> {
    this.specimens.remove(specimen);
    this.parents.push(specimen);
    this.specimens.push(this.reproduceSpecimen(this.parents.value));

    if (this.parents.value.length > this.options.parents) {
      this.parents.remove(this.determineWorstParent(this.parents.value));
    }

    return this;
  }

  /**
     * replaces the specimen with a new offspring
     * 
     * @param {ISpecimen<Gen, Pheno>} [specimen=this.specimens.value[0]] 
     * @returns {SpecimenPopulation<Gen, Pheno>} 
     * @memberof SpecimenPopulation
     */
  public kill(
    specimen: ISpecimen<Gen, Pheno> = this.specimens.value[0]
  ): SpecimenPopulation<Gen, Pheno> {
    this.specimens.remove(specimen);
    this.specimens.push(this.reproduceSpecimen(this.parents.value));

    return this;
  }

  /**
     * replaces the specimen with a randomly generated one
     * 
     * @param {ISpecimen<Gen, Pheno>} [specimen=this.specimens.value[0]] - the specimen you want to randomize
     * @returns {SpecimenPopulation<Gen, Pheno>} 
     * @memberof SpecimenPopulation
     */
  public randomize(
    specimen: ISpecimen<Gen, Pheno> = this.specimens.value[0]
  ): SpecimenPopulation<Gen, Pheno> {
    this.specimens.remove(specimen);
    this.specimens.push(this.createSpecimen(this.genOptions));

    return this;
  }

  /**
     * fills the provided array of specimens with new randomly generated specimens
     * 
     * @private
     * @param {Array<ISpecimen<Gen, Pheno>>} [specimens=[]] 
     * @param {number} [n=this.options.specimens] 
     * @returns {Array<ISpecimen<Gen, Pheno>>} 
     * @memberof SpecimenPopulation
     */
  private fillSpecimens(
    specimens: ReactiveCollection<
      ISpecimen<Gen, Pheno>
    > = new ReactiveCollection(),
    n: number = this.options.specimens
  ): ReactiveCollection<ISpecimen<Gen, Pheno>> {
    const newSpecs = _.range(n - specimens.value.length).map(i =>
      this.createSpecimen(this.genOptions)
    );

    const specs = _.concat(specimens.value, newSpecs);

    return new ReactiveCollection(specs);
  }

  /**
     * fills the provided array of parents with new randomly generated parents
     * 
     * @private
     * @param {Array<ISpecimen<Gen, Pheno>>} [parents=[]] 
     * @param {number} [n=this.options.parents] 
     * @returns {Array<ISpecimen<Gen, Pheno>>} 
     * @memberof SpecimenPopulation
     */
  private fillParents(
    parents: ReactiveCollection<
      ISpecimen<Gen, Pheno>
    > = new ReactiveCollection(),
    n: number = this.options.parents
  ): ReactiveCollection<ISpecimen<Gen, Pheno>> {
    const newParents = _.range(n - parents.value.length).map(i => {
      return this.createSpecimen(this.genOptions);
    });

    return new ReactiveCollection(parents.value.concat(newParents));
  }

  /**
     * fills the provided array of specimens with the offspring of all parents
     * 
     * @private
     * @param {Array<ISpecimen<Gen, Pheno>>} specs - the array of specimens you want to fill with offspring
     * @param {Array<ISpecimen<Gen, Pheno>>} parents - the array of parents that will contribute genetics to new offspring
     * @param {number} [n=this.options.specimens] - the total number of specimens you want, including new and old ones
     * @returns {Array<ISpecimen<Gen, Pheno>>} 
     * @memberof SpecimenPopulation
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

  /**
     * ages all specimens passed in by a certain amount (1 by default)
     * 
     * @private
     * @param {Array<ISpecimen<Gen, Pheno>>} specs - the specimens you want to age
     * @param {number} [by=1] 
     * @returns {Array<ISpecimen<Gen, Pheno>>} 
     * @memberof SpecimenPopulation
     */
  private ageSpecimens(
    specs: Array<ISpecimen<Gen, Pheno>>,
    by: number = 1
  ): Array<ISpecimen<Gen, Pheno>> {
    return specs.map(s => s.ageSpecimen(by));
  }
}
