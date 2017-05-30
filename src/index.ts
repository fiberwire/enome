import { Genome } from "./genotypes/genome";

import { Gene } from "genotypes/gene";
import { IEvaluation } from "./interfaces/evaluation";
import { IParent } from "./interfaces/parent";
import { avgFitness } from "./operators/avg-fitness";
import { best } from "./operators/best";
import { bottom } from "./operators/bottom";
import { clone } from "./operators/clone";
import { concat } from "./operators/concat";
import { fill } from "./operators/fill";
import { fillRandom } from "./operators/fill-random";
import { fillWorst } from "./operators/fill-worst";
import { generateGenomes } from "./operators/generate-genomes";
import { avg } from "./operators/mutation/avg";
import { mutate } from "./operators/mutation/mutate";
import { mutateMany } from "./operators/mutation/mutate-many";
import { safeMutate } from "./operators/mutation/safe-mutate";
import { safeMutateMany } from "./operators/mutation/safe-mutate-many";
import { safeSampledMutate } from "./operators/mutation/safe-sampled-mutate";
import { safeSampledMutateMany } from "./operators/mutation/safe-sampled-mutate-many";
import { sampledMutate } from "./operators/mutation/sampled-mutate";
import { sampledMutateMany } from "./operators/mutation/sampled-mutate-many";
import { sub } from "./operators/mutation/sub";
import { replenish } from "./operators/replenish";
import { replenishMany } from "./operators/replenish-many";
import { reproduceManyToMany } from "./operators/reproduction/many-to-many/reproduce-many-to-many";
import { safeReproduceManyToMany } from "./operators/reproduction/many-to-many/safe-reproduce-many-to-many";
import {
    safeSampledReproduceManyToMany,
} from "./operators/reproduction/many-to-many/safe-sampled-reproduce-many-to-many";
import { sampledReproduceManyToMany } from "./operators/reproduction/many-to-many/sampled-reproduce-many-to-many";
import { reproduceManyToOne } from "./operators/reproduction/many-to-one/reproduce-many-to-one";
import { safeReproduceManyToOne } from "./operators/reproduction/many-to-one/safe-reproduce-many-to-one";
import { safeSampledReproduceManyToOne } from "./operators/reproduction/many-to-one/safe-sampled-reproduce-many-to-one";
import { sampledReproduceManyToOne } from "./operators/reproduction/many-to-one/sampled-reproduce-many-to-one";
import { reproduce } from "./operators/reproduction/reproduce";
import { safeReproduce } from "./operators/reproduction/safe-reproduce";
import { safeSampledReproduce } from "./operators/reproduction/safe-sampled-reproduce";
import { sampledReproduce } from "./operators/reproduction/sampled-reproduce";
import { top } from "./operators/top";
import { value } from "./operators/value";
import { values } from "./operators/values";
import { worst } from "./operators/worst";
import { IArtificialPooledSelectionOptions } from "./options/artificial-pooled-selection-options";
import { IArtificialSelectionOptions } from "./options/artificial-selection-options";
import { IGenomeOptions } from "./options/genome-options";
import { MutateOptions } from "./options/mutate-options";
import { NaturalSelectionOptions } from "./options/natural-selection-options";
import { ReproduceOptions } from "./options/reproduce-options";
import { ArtificialPooledSelection } from "./populations/artificial-pooled-selection";
import { ArtificialSelection } from "./populations/artificial-selection";
import { NaturalSelection } from "./populations/natural-selection";

// options
export {
    IGenomeOptions,
    MutateOptions,
    ReproduceOptions,
    NaturalSelectionOptions,
    IArtificialSelectionOptions,
    IArtificialPooledSelectionOptions,
};

// genotypes
export {
    Genome,
    Gene,
};

// operators
export {
    avgFitness,
    best,
    bottom,
    clone,
    concat,
    fill,
    fillRandom,
    fillWorst,
    generateGenomes,
    replenishMany,
    replenish,
    top,
    value,
    values,
    worst,
};

// mutation operators
export {
    avg,
    mutate,
    safeMutate,
    safeSampledMutate,
    sampledMutate,
    sub,
};

// mutate many operators
export {
    mutateMany,
    safeMutateMany,
    safeSampledMutateMany,
    sampledMutateMany,
};

// reproduction operators
export {
    reproduce,
    safeReproduce,
    safeSampledReproduce,
    sampledReproduce,
};

// many-to-one reproduction operators
export {
    reproduceManyToOne,
    safeReproduceManyToOne,
    safeSampledReproduceManyToOne,
    sampledReproduceManyToOne,
};

// many-to-many reproduction operators
export {
    reproduceManyToMany,
    safeReproduceManyToMany,
    safeSampledReproduceManyToMany,
    sampledReproduceManyToMany,
};

// interfaces
export {
    IEvaluation,
    IParent,
};

// populations
export {
    NaturalSelection,
    ArtificialSelection,
    ArtificialPooledSelection,
};
