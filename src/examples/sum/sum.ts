import * as _ from 'lodash';
import {
  FitnessObjective,
  GenomeRefill,
  IOrganismOptions,
  MutateOp,
  NaturalSelection,
  UpdateType,
} from '../../index';
import { ISumGenomeOptions } from './interfaces/sum-genome-options';
import { ISumPopOptions } from './interfaces/sum-pop-options';
import { SumPopulation } from './sum-population';
import { SumSelection } from './sum-selection';

const genOptions: ISumGenomeOptions = {
  geneLength: 1,
  genomeLength: 10,
  length: 10,
  max: 5000,
  min: 1,
  refill: GenomeRefill.extend
};

const popOptions: ISumPopOptions = {
  generations: 1000,
  logInterval: 10,
  logProgress: true,
  objective: FitnessObjective.minimize,
  parents: 5,
  specimens: 10,
};

const pop = new SumPopulation(popOptions, genOptions);

const sim = new SumSelection(popOptions, genOptions);

sim.best.subscribe(b => {
  const list = b.phenotype;
  const fitness = b.fitness;
  const sum = _.sum(list);

  // tslint:disable-next-line:no-console
  console.log(`New Best: list: ${list} sum: ${sum} fitness: ${fitness}`);
});
