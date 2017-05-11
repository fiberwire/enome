import { GenomeOptions } from "options/genome-options";
import { PopulationOptions } from "options/population-options";
import { Genome } from "genotypes/genome";
import { Nucleotide } from "genotypes/nucleotide";
import { best } from "operators/best";
import { top } from "operators/top";
import { value } from "operators/value";
import { fill } from "operators/fill";
import { avg } from "operators/mutation/avg";
import { sub } from "operators/mutation/sub";
import { mutate } from "operators/mutation/mutate";
import { safeMutate } from "operators/mutation/safe-mutate";
import { sampledMutate } from "operators/mutation/sampled-mutate";
import { safeSampledMutate } from "operators/mutation/safe-sampled-mutate";
import { reproduce } from "operators/reproduction/reproduce";
import { Evaluation } from "evalutation";
import { values } from "operators/values";
import { clone } from "operators/clone";
import { replenish } from "operators/replenish";
import { safeReproduce } from "operators/reproduction/safe-reproduce";
import { sampledReproduce } from "operators/reproduction/sampled-reproduce";
import { safeSampledReproduce } from "operators/reproduction/safe-sampled-reproduce";
import { reproduceManyToOne } from "operators/reproduction/reproduce-many-to-one";

//options
export {
    GenomeOptions,
    PopulationOptions
};

//genotypes
export {
    Genome,
    Nucleotide
}

//operators
export {
    best,
    top,
    value,
    values,
    fill,
    clone,
    replenish
}

//mutation operators
export {
    avg,
    sub,
    mutate,
    safeMutate,
    sampledMutate,
    safeSampledMutate
}

//reproduction operators
export {
    reproduce,
    safeReproduce,
    sampledReproduce,
    safeSampledReproduce,
    reproduceManyToOne
}

//misc
export {
    Evaluation
}
