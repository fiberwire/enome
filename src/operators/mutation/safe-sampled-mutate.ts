import { FitnessObjective } from "../../enums/fitness-objective";
import { MutateOp } from "../../enums/mutate-op";
import { Genome } from "../../genotypes/genome";
import { IEvaluation } from "../../interfaces/evaluation";
import { IGenomeOptions } from "../../options/genome-options";
import { best } from "../best";
import { worst } from "../worst";
import { sampledMutate } from "./sampled-mutate";

export function safeSampledMutate<T extends IGenomeOptions, U>(
    gen: Genome<T>,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    sampleSize: number = 5,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub,
): Genome<T> {
    const mutant = sampledMutate(gen, fitness, objective, sampleSize, mutateChance, mutateType);

    switch (objective) {
        case FitnessObjective.maximize:
            return best([gen, mutant], fitness).genome;

        case FitnessObjective.minimize:
            return worst([gen, mutant], fitness).genome;
    }
}
