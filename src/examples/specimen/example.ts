import {
  ArtificialCmd,
  ArtificialSelection,
  Genome,
  IArtificialOptions,
  IGenomeOptions,
  reproduceManyToOne,
  Specimen,
} from '../../index';
import { SumArtificial } from './sum-artificial';

const artOptions = {
  interactionTime: 1,
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
  console.log(s.state.parents);
});

art.nextInteraction({
  agentID: 'example',
  index: 1,
  state: {
    cmd: ArtificialCmd.keep,
    specimenIndex: 0,
  },
});
