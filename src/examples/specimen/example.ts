import { ArtificialOp } from '../../index';
import { SumArtificial } from './sum-artificial';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

const artOptions = {
  interactionTime: 0,
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
  .filter(s => s.state.parents.length > 0)
  .filter(s => s.state.specimens.length > 0)
  .subscribe(s => {
    const specs = s.state.specimens
      .map(p => p.genotype.id)
      .reduce((p, c) => `${p}, ${c}`);

    const parents = s.state.parents
      .map(p => p.genotype.id)
      .reduce((p, c) => `${p}, ${c}`);

    // tslint:disable-next-line:no-console
    console.log(`
    [Generation: ${s.index}]
      Specimens: ${specs}
      Parents:   ${parents}
      `);
  });

Observable.interval(75).subscribe(i => {
  art.keep();
});
