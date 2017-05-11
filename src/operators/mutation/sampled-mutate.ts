
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";

import * as _ from 'lodash';
import { mutate } from "operators/mutation/mutate";

export function sampledMutate<T extends GenomeOptions>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T>,
    sampleSize: number = 5,
    mutateChance: number = 0.05,
    mutateType: string = 'sub'
): Genome<T> {
    let mutants = _.range(0, sampleSize)
    .map(i => mutate(gen, mutateChance, mutateType))
    .map(fitness);

    return _.maxBy(mutants, m => m.fitness).genome;
}