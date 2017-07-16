import { FillType } from "./enums/fill-type";
import { FitnessObjective } from "./enums/fitness-objective";
import { MutateOp } from "./enums/mutate-op";
import { MutateType } from "./enums/mutate-type";
import { ReproduceType } from "./enums/reproduce-type";
import { Gene } from "./genotypes/gene";
import { Genome } from "./genotypes/genome";
import { IEvaluation } from "./interfaces/evaluation";
import { clone } from "./operators/clone";
import { concat } from "./operators/concat";
import { fill } from "./operators/fill";
import { fillRandom } from "./operators/fill-random";
import { generateGenomes } from "./operators/generate-genomes";
import { avg } from "./operators/mutation/avg";
import { mutate } from "./operators/mutation/mutate";
import { mutateMany } from "./operators/mutation/mutate-many";
import { sub } from "./operators/mutation/sub";
import { refresh } from "./operators/refresh";
import { reproduceManyToMany } from "./operators/reproduction/many-to-many/reproduce-many-to-many";
import { reproduceManyToOne } from "./operators/reproduction/many-to-one/reproduce-many-to-one";
import { reproduce } from "./operators/reproduction/reproduce";
import { value } from "./operators/value";
import { values } from "./operators/values";
import { IGenomeOptions } from "./options/genome-options";
import { IMutateOptions } from "./options/mutate-options";
import { IReproduceOptions } from "./options/reproduce-options";

// options
export {
    IGenomeOptions,
    IMutateOptions,
    IReproduceOptions,
};

// genotypes
export {
    Genome,
    Gene,
};

// operators
export {
    clone,
    concat,
    fill,
    fillRandom,
    generateGenomes,
    refresh,
    value,
    values,
};

// mutation operators
export {
    avg,
    mutate,
    sub,
};

// mutate many operators
export {
    mutateMany,
};

// reproduction operators
export {
    reproduce,
};

// many-to-one reproduction operators
export {
    reproduceManyToOne,
};

// many-to-many reproduction operators
export {
    reproduceManyToMany,
};

// interfaces
export {
    IEvaluation,
};

// populations
export {

};

// enums
export {
    FillType,
    FitnessObjective,
    MutateOp,
    MutateType,
    ReproduceType,
};
