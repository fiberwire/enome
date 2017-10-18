import * as _ from 'lodash';
import { FitnessObjective } from '../../index';
import { ISumPopOptions } from './options';
import SumPopulation from './sum-population';

const options: ISumPopOptions = {
  genOptions: {
    genomeLength: 10,
    length: 15,
    max: 100,
    min: 1,
    target: 1337,
  },
  generations: 10,
  objective: FitnessObjective.minimize,
  parents: 2,
  specimens: 5,
};

const pop = new SumPopulation(options);

pop.best.subscribe(({ fitness, phenotype }) => {
  const sum = _.sum(phenotype);
  console.log(`new best: [${phenotype}], sum: ${sum}, fitness: ${fitness}`);
});
