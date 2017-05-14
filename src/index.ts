import { avg } from './operators/mutation/avg';
import { avgFitness } from './operators/avg-fitness';
import { best } from './operators/best';
import { bottom } from './operators/bottom';
import { clone } from './operators/clone';
import { concat } from './operators/concat';
import { Evaluation } from './evaluation';
import { fill } from './operators/fill';
import { Genome } from './genotypes/genome';
import { GenomeOptions } from './options/genome-options';
import { mutate } from './operators/mutation/mutate';
import { mutateMany } from './operators/mutation/mutate-many';
import { Nucleotide } from './genotypes/nucleotide';
import { Population } from './evolution/population';
import { PopulationOptions } from './options/population-options';
import { replenish } from './operators/replenish';
import { reproduce } from './operators/reproduction/reproduce';
import { reproduceManyToMany } from './operators/reproduction/many-to-many/reproduce-many-to-many';
import { reproduceManyToOne } from './operators/reproduction/many-to-one/reproduce-many-to-one';
import { safeMutate } from './operators/mutation/safe-mutate';
import { safeMutateMany } from './operators/mutation/safe-mutate-many';
import { safeReproduce } from './operators/reproduction/safe-reproduce';
import { safeReproduceManyToMany } from './operators/reproduction/many-to-many/safe-reproduce-many-to-many';
import { safeReproduceManyToOne } from './operators/reproduction/many-to-one/safe-reproduce-many-to-one';
import { safeSampledMutate } from './operators/mutation/safe-sampled-mutate';
import { safeSampledMutateMany } from './operators/mutation/safe-sampled-mutate-many';
import { safeSampledReproduce } from './operators/reproduction/safe-sampled-reproduce';
import { safeSampledReproduceManyToMany } from './operators/reproduction/many-to-many/safe-sampled-reproduce-many-to-many';
import { safeSampledReproduceManyToOne } from './operators/reproduction/many-to-one/safe-sampled-reproduce-many-to-one';
import { sampledMutate } from './operators/mutation/sampled-mutate';
import { sampledMutateMany } from './operators/mutation/sampled-mutate-many';
import { sampledReproduce } from './operators/reproduction/sampled-reproduce';
import { sampledReproduceManyToMany } from './operators/reproduction/many-to-many/sampled-reproduce-many-to-many';
import { sampledReproduceManyToOne } from './operators/reproduction/many-to-one/sampled-reproduce-many-to-one';
import { sub } from './operators/mutation/sub';
import { top } from './operators/top';
import { value } from './operators/value';
import { values } from './operators/values';
import { worst } from './operators/worst';

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
    avgFitness,
    best,
    bottom,
    clone,
    concat,
    fill,
    replenish,
    top,
    value,
    values,
    worst
}

//mutation operators
export {
    avg,
    mutate,
    safeMutate,
    safeSampledMutate,
    sampledMutate,
    sub
}

//mutate many operators
export {
    mutateMany,
    safeMutateMany,
    safeSampledMutateMany,
    sampledMutateMany
}

//reproduction operators
export {
    reproduce,
    safeReproduce,
    safeSampledReproduce,
    sampledReproduce
}

//many-to-one reproduction operators
export {
    reproduceManyToOne,
    safeReproduceManyToOne,
    safeSampledReproduceManyToOne,
    sampledReproduceManyToOne
}

//many-to-many reproduction operators
export {
    reproduceManyToMany,
    safeReproduceManyToMany,
    safeSampledReproduceManyToMany,
    sampledReproduceManyToMany
}

//misc
export {
    Evaluation,
    Population
}
