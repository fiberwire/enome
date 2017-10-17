import { IArtificialAState } from './artificial-selection/artificial-astate';
import { IArtificialCmd } from './artificial-selection/artificial-cmd';
import { IArtificialEState } from './artificial-selection/artificial-estate';
import { ArtificialOp } from './artificial-selection/artificial-op';
import { ArtificialSelection } from './artificial-selection/artificial-selection';
import { FillType } from './enums/fill-type';
import { FitnessObjective } from './enums/fitness-objective';
import { GenomeRefill } from './enums/genome-refill';
import { MutateOp } from './enums/mutate-op';
import { UpdateType } from './enums/update-type';
import { Gene } from './genotypes/gene';
import { Genome } from './genotypes/genome';
import { IEvaluation } from './interfaces/evaluation';
import { IEvolvable } from './interfaces/evolvable';
import { IReversible } from './interfaces/reversible';
import { ISpecimen } from './interfaces/specimen';
import { clone } from './operators/clone';
import { cloneEvaluation } from './operators/cloneEvaluation';
import { concat } from './operators/concat';
import { fill } from './operators/fill';
import { fillRandom } from './operators/fill-random';
import { generateGenomes } from './operators/generate-genomes';
import { hexColor } from './operators/hex-color';
import { lerp } from './operators/lerp';
import { avg } from './operators/mutation/avg';
import { mutate } from './operators/mutation/mutate';
import { mutateMany } from './operators/mutation/mutate-many';
import { sub } from './operators/mutation/sub';
import { pad } from './operators/pad';
import { refill } from './operators/refill';
import { reproduce } from './operators/reproduction/reproduce';
import { reproduceManyToMany } from './operators/reproduction/reproduce-many-to-many';
import { reproduceManyToOne } from './operators/reproduction/reproduce-many-to-one';
import { reverseLerp } from './operators/reverse-lerp';
import { rgbaColor } from './operators/rgba-color';
import { weight } from './operators/weight';
import { weights } from './operators/weights';
import { IArtificialOptions } from './options/artificial-options';
import { IEnvironmentOptions } from './options/environment-options';
import { IGenomeOptions } from './options/genome-options';
import { IMutateOptions } from './options/mutate-options';
import { IPopulationOptions } from './options/population-options';
import { IReproduceOptions } from './options/reproduce-options';
import { ReactiveCollection } from './reactive-collection';
import { ReactiveProperty } from './reactive-property';

// options
export {
  IArtificialOptions,
  IGenomeOptions,
  IMutateOptions,
  IReproduceOptions,
  IPopulationOptions,
  IEnvironmentOptions
};

// genotypes
export { Genome, Gene };

// operators
export {
  clone,
  cloneEvaluation,
  concat,
  fill,
  fillRandom,
  generateGenomes,
  hexColor,
  lerp,
  pad,
  refill,
  reverseLerp,
  rgbaColor,
  weight,
  weights,
};

// mutation operators
export { avg, mutate, mutateMany, sub };

// reproduction operators
export { reproduce, reproduceManyToMany, reproduceManyToOne };

// interfaces
export {
  IEvaluation,
  IEvolvable,
  IArtificialAState,
  IArtificialCmd,
  IArtificialEState,
  IReversible,
  ISpecimen,
};

// evolution stuff
export { ArtificialSelection };

// enums
export {
  ArtificialOp,
  FillType,
  FitnessObjective,
  GenomeRefill,
  MutateOp,
  UpdateType,
};

// misc
export { ReactiveProperty, ReactiveCollection };
