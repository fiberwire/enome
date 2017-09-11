import { ArtificialCmd } from '../../index';
import { SumArtificial } from './sum-artificial';

import * as _ from 'lodash';

const artOptions = {
  interactionTime: 10,
  parents: 5,
  specimens: 10,
};

const genOptions = {
  geneLength: 3,
  genomeLength: 100,
  length: 5,
  max: 100,
  min: 1,
};

const art = new SumArtificial(artOptions, genOptions);

art.states.subscribe(s => {
  // tslint:disable-next-line:no-console
  console.log(`[${s.index}] ${s.state.parents}`);
});

art.agentInteractions('example').subscribe(i => {
  console.log(`[${i.interaction.index}] ${i.interaction.agentID}`);
});

_.range(10).map(i => {
  art.nextInteraction({
    agentID: 'example',
    index: i,
    state: {
      cmd: ArtificialCmd.kill,
      specimenIndex: 0,
    },
  });
});
