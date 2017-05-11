
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { reproduce } from "operators/reproduction/reproduce";
import { best } from "operators/best";
import { Evaluation } from "evalutation";

export function safeReproduce<T extends GenomeOptions>(
    gen1: Genome<T>,
    gen2: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T>,
    weight1: number = 1,
    weight2: number = 1,
    mutateChance: number = 0.05
): Genome<T>{
    let offspring = reproduce(gen1, gen2, weight1, weight2, mutateChance);

    return best([gen1, gen2, offspring], fitness).genome;
}