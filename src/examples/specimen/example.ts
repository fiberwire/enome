import { ArtificialOp, FitnessObjective } from '../../index';
import { SumArtificial } from './sum-artificial';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

const artOptions = {
  generations: 1000,
  interactionTime: 0,
  logInterval: 10,
  logProgress: true,
  objective: FitnessObjective.minimize,
  parents: 5,
  specimens: 10,
};

const genOptions = {
  geneLength: 30,
  genomeLength: 100,
  length: 5,
  max: 100,
  min: 1,
};

const art = new SumArtificial(artOptions, genOptions);

art.states
  .filter(s => s.state.population.parents.value.length > 0)
  .filter(s => s.state.population.specimens.value.length > 0)
  .subscribe(s => {
    const specs = s.state.population.specimens.value
      .map(p => p.genotype.id)
      .reduce((p, c) => `${p}, ${c}`);

    const parents = s.state.population.parents.value
      .map(p => p.genotype.id)
      .reduce((p, c) => `${p}, ${c}`);

    // tslint:disable-next-line:no-console
    console.log(`
    [Generation: ${s.index}]
      Specimens: ${specs}
      Parents:   ${parents}
      `);
  });

Observable.interval(1000).subscribe(i => {
  art.keep();
});
