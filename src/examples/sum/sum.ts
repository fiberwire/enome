import {
  FitnessObjective,
  GenomeRefill,
  IOrganismOptions,
  MutateOp,
  Simulation,
  UpdateType,
} from '../../index';
import { ISumGenomeOptions } from './interfaces/sum-genome-options';
import { ISumOrganismOptions } from './interfaces/sum-organism-options';
import { ISumPopOptions } from './interfaces/sum-pop-options';
import { SumEnv } from './sum-environment';
import { SumPopulation } from './sum-population';

import * as _ from 'lodash';
import * as Rx from 'rxjs';

const genOptions: ISumGenomeOptions = {
  genomeLength: 10,
  length: 10,
  max: 5000,
  min: 1,
};

const popOptions: ISumPopOptions = {
  generations: 1000,
  logInterval: 10,
  logProgress: true,
  objective: FitnessObjective.minimize,
  size: 10,
};

const orgOptions: ISumOrganismOptions = {
  interactions: 1,
  target: 14567,
};

const env = new SumEnv({
  interactionTime: 1,
});

const pop = new SumPopulation(genOptions, popOptions, orgOptions);

const sim = new Simulation(pop, env).start();

sim.best.subscribe(b => {
  const list = b.phenotype;
  const fitness = b.fitness;
  const sum = _.sum(list);

  // tslint:disable-next-line:no-console
  console.log(`New Best: list: ${list} sum: ${sum} fitness: ${fitness}`);
});
