import { FillType } from './enums/fill-type';
import { FitnessObjective } from './enums/fitness-objective';
import { GenomeRefill } from './enums/genome-refill';
import { MutateOp } from './enums/mutate-op';
import { UpdateType } from './enums/update-type';
import { ArtificialSelection } from './environments/artificial-selection';
import { Gene } from './genotypes/gene';
import { Genome } from './genotypes/genome';
import { IArtificialEState } from './interfaces/artificial-state';
import { IEvaluation } from './interfaces/evaluation';
import { IEvolvable } from './interfaces/evolvable';
import { clone } from './operators/clone';
import { cloneEvaluation } from './operators/cloneEvaluation';
import { cloneOrganism } from './operators/cloneOrganism';
import { concat } from './operators/concat';
import { fill } from './operators/fill';
import { fillRandom } from './operators/fill-random';
import { generateGenomes } from './operators/generate-genomes';
import { avg } from './operators/mutation/avg';
import { mutate } from './operators/mutation/mutate';
import { mutateMany } from './operators/mutation/mutate-many';
import { sub } from './operators/mutation/sub';
import { refill } from './operators/refill';
import { reproduceManyToMany } from './operators/reproduction/many-to-many/reproduce-many-to-many';
import { reproduceManyToOne } from './operators/reproduction/many-to-one/reproduce-many-to-one';
import { reproduce } from './operators/reproduction/reproduce';
import { value } from './operators/value';
import { values } from './operators/values';
import { IArtificialOptions } from './options/artificial-options';
import { IEnvironmentOptions } from './options/environment-options';
import { IGenomeOptions } from './options/genome-options';
import { IMutateOptions } from './options/mutate-options';
import { IOrganismOptions } from './options/organism-options';
import { IPopulationOptions } from './options/population-options';
import { IReproduceOptions } from './options/reproduce-options';
import { Organism } from './organisms/organism';
import { IParentSpecimen } from './organisms/parent-specimen';
import { Specimen } from './organisms/specimen';
import { Population } from './populations/population';
import { ReactiveCollection } from './reactive-collection';
import { ReactiveProperty } from './reactive-property';
import { Simulation } from './simulation/simulation';
import { ArtificalCmd } from "./enums/artificial-cmd";

// options
export {
  IArtificialOptions,
  IGenomeOptions,
  IMutateOptions,
  IReproduceOptions,
  IPopulationOptions,
  IEnvironmentOptions,
  IOrganismOptions,
};

// genotypes
export { Genome, Gene };

// operators
export {
  clone,
  cloneEvaluation,
  cloneOrganism,
  concat,
  fill,
  fillRandom,
  generateGenomes,
  refill,
  value,
  values,
};

// mutation operators
export { avg, mutate, mutateMany, sub };

// reproduction operators
export { reproduce, reproduceManyToMany, reproduceManyToOne };

// interfaces
export { IEvaluation, IEvolvable, IArtificialEState };

// evolution stuff
export {
  ArtificialSelection,
  Organism,
  Population,
  IParentSpecimen,
  Specimen,
  Simulation,
};

// enums
export { ArtificalCmd, FillType, FitnessObjective, GenomeRefill, MutateOp, UpdateType };

// misc
export { ReactiveProperty, ReactiveCollection };
