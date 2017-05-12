
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
import { sampledMutate } from "operators/mutation/sampled-mutate";
import { best } from "operators/best";
import { replenish } from "operators/replenish";

export function safeSampledMutate<T extends GenomeOptions>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T>,
    sampleSize: number = 5,
    mutateChance: number = 0.05,
    mutateType: string = 'sub',
): Genome<T> {
    let mutant = sampledMutate(gen, fitness, sampleSize, mutateChance, mutateType);

    return best([gen, mutant], fitness).genome;
}