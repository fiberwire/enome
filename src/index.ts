import { EnvType } from "./enums/env-type";
import { FillType } from "./enums/fill-type";
import { FitnessObjective } from "./enums/fitness-objective";
import { GenomeRefill } from "./enums/genome-refill";
import { MutateOp } from "./enums/mutate-op";
import { Environment } from "./environments/environment";
import { Gene } from "./genotypes/gene";
import { Genome } from "./genotypes/genome";
import { IEvaluation } from "./interfaces/evaluation";
import { Interaction } from "./interfaces/interaction";
import { IStateUpdate } from "./interfaces/state-update";
import { clone } from "./operators/clone";
import { cloneEvaluation } from "./operators/cloneEvaluation";
import { cloneOrganism } from "./operators/cloneOrganism";
import { concat } from "./operators/concat";
import { fill } from "./operators/fill";
import { fillRandom } from "./operators/fill-random";
import { generateGenomes } from "./operators/generate-genomes";
import { avg } from "./operators/mutation/avg";
import { mutate } from "./operators/mutation/mutate";
import { mutateMany } from "./operators/mutation/mutate-many";
import { sub } from "./operators/mutation/sub";
import { refill } from "./operators/refill";
import { reproduceManyToMany } from "./operators/reproduction/many-to-many/reproduce-many-to-many";
import { reproduceManyToOne } from "./operators/reproduction/many-to-one/reproduce-many-to-one";
import { reproduce } from "./operators/reproduction/reproduce";
import { value } from "./operators/value";
import { values } from "./operators/values";
import { IEnvironmentOptions } from "./options/environment-options";
import { IGenomeOptions } from "./options/genome-options";
import { IMutateOptions } from "./options/mutate-options";
import { IPopulationOptions } from "./options/population-options";
import { IReproduceOptions } from "./options/reproduce-options";
import { Organism } from "./organisms/organism";
import { Population } from "./populations/population";
import { ReactiveProperty } from "./reactive-property";

// options
export {
    IGenomeOptions,
    IMutateOptions,
    IReproduceOptions,
    IPopulationOptions,
    IEnvironmentOptions,
};

// genotypes
export {
    Genome,
    Gene,
};

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
export {
    avg,
    mutate,
    mutateMany,
    sub,
};

// reproduction operators
export {
    reproduce,
    reproduceManyToMany,
    reproduceManyToOne,
};

// interfaces
export {
    IEvaluation,
    Interaction,
    IStateUpdate,
};

// evolution stuff
export {
    Environment,
    Organism,
    Population,
};

// enums
export {
    EnvType,
    FillType,
    FitnessObjective,
    GenomeRefill,
    MutateOp,
};

// misc
export {
    ReactiveProperty,
};
