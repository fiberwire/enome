import { FitnessObjective } from "../../enums/fitness-objective";
import { MutateOp } from "../../enums/mutate-op";
import { Genome } from "../../genotypes/genome";
import { IEvaluation } from "../../interfaces/evaluation";
import { IGenomeOptions } from "../../options/genome-options";
import { best } from "../best";
import { worst } from "../worst";
import { mutate } from "./mutate";

// returns a mutated genome unless the original genome is more fit, in which case, it returns the original genome
export function safeMutate<T extends IGenomeOptions, U>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub,
): Genome<T> {
    const mutant = mutate(gen, mutateChance, mutateType);

    switch (objective) {
        case FitnessObjective.maximize:
            return best([gen, mutant], fitness).genome;

        case FitnessObjective.minimize:
            return worst([gen, mutant], fitness).genome;
    }

}
