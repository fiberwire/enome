import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "index";
import { reproduce } from "operators/reproduction/reproduce";
import { best } from "operators/best";

import * as _ from 'lodash';

export function sampledReproduce<T extends GenomeOptions>(
    gen1: Genome<T>,
    gen2: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T>,
    samepleSize: number = 5,
    weight1: number = 1,
    weight2: number = 1,
    mutateChance: number = 0.05
): Genome<T>{
    let offspring = _.range(0, samepleSize)
        .map(i => reproduce(gen1, gen2, weight1, weight2, mutateChance));

    return best(offspring, fitness).genome;
}