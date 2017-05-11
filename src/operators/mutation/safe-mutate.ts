
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
import { mutate } from "operators/mutation/mutate";

//returns a mutated genome unless the original genome is more fit, in which case, it returns the original genome
export function safeMutate<T extends GenomeOptions>(
    gen: Genome<T>, mutateChance: number = 0.05,
    mutateType: string = 'sub', fitness: (gen: Genome<T>) => Evaluation<T>): Genome<T> {
    let mutant = mutate(gen, mutateChance, mutateType);

    if (fitness(mutant).fitness >= fitness(gen).fitness) {
        return mutant;
    }
    else {
        return gen;
    }
}