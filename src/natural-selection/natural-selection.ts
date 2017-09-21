import { Chance } from 'chance';
import { AgentEnvironment, IAgent } from 'enviro-rx';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import {
  ArtificialSelection,
  FitnessObjective,
  IArtificialOptions,
  IDataEvaluation,
  IEvaluation,
  IGenomeOptions,
  IPopulationOptions,
  ISpecimen,
  SpecimenPopulation,
} from '../index';

const chance = new Chance();

export abstract class NaturalSelection<Gen extends IGenomeOptions, Pheno> {
  public population: SpecimenPopulation<Gen, Pheno>;

  public subs: Subscription = new Subscription();

  public get best(): Observable<ISpecimen<Gen, Pheno>> {
    if (this.popOptions.objective === FitnessObjective.minimize) {
      return this.population.parents.pushed.filter(
        parent =>
          parent.fitness <=
          _.minBy(this.population.parents.value, p => p.fitness).fitness
      );
    } else {
      return this.population.parents.pushed.filter(
        parent =>
          parent.fitness >=
          _.maxBy(this.population.parents.value, p => p.fitness).fitness
      );
    }
  }

  constructor(
    public popOptions: IPopulationOptions,
    genOptions: IGenomeOptions
  ) {
    this.population = this.createPopulation(popOptions, genOptions);
    this.subs.add(this.evolve());
  }

  public abstract createPopulation(
    popOptions: IPopulationOptions,
    genOptions: IGenomeOptions
  ): SpecimenPopulation<Gen, Pheno>;

  public abstract evaluate(specimen: ISpecimen<Gen, Pheno>): number;

  public evolve(): Subscription {
    return this.population.specimens.pushed.subscribe(spec => {
      spec.fitness = this.evaluate(spec);
      const worstParent = this.population.determineWorstParent(
        this.population.parents.value
      );

      // keep specimens that are better than the worst parent
      if (spec.fitness > worstParent.fitness) {
        this.population.keep(spec);
      } else {
        // kill or randomize specimens that are worse than the worst parent
        const update = chance.weighted(
          [
            this.population.kill.bind(this.population),
            this.population.randomize.bind(this.population),
          ],
          [
            this.popOptions.updateWeights.reproduce,
            this.popOptions.updateWeights.randomize,
          ]
        );

        update(spec);
      }
    });
  }
}
