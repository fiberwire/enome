
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
import { mutate } from "operators/mutation/mutate";
import { best } from "operators/best";
import { replenish } from "operators/replenish";

//returns a mutated genome unless the original genome is more fit, in which case, it returns the original genome
export function safeMutate<T extends GenomeOptions>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => Evaluation<T>,
    mutateChance: number = 0.05,
    mutateType: string = 'sub'
): Genome<T> {
    let mutant = mutate(gen, mutateChance, mutateType);

    return best([gen, mutant], fitness).genome;
}