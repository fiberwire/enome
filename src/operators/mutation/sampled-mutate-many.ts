import * as _ from "lodash";
import { FitnessObjective } from "../../enums/fitness-objective";
import { MutateOp } from "../../enums/mutate-op";
import { Genome } from "../../genotypes/genome";
import { IEvaluation } from "../../interfaces/evaluation";
import { IGenomeOptions } from "../../options/genome-options";
import { best } from "../best";
import { worst } from "../worst";
import { mutate } from "./mutate";

export function sampledMutateMany<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub,
    sampleSize: number = 5,
): Array<Genome<T>> {

    switch (objective) {
        case FitnessObjective.maximize:
            return genomes.map((g) => {
                const sample = _.range(0, sampleSize).map((i) => mutate(g, mutateChance, mutateType));
                return best(sample, fitness).genome;
            });

        case FitnessObjective.minimize:
            return genomes.map((g) => {
                const sample = _.range(0, sampleSize).map((i) => mutate(g, mutateChance, mutateType));
                return worst(sample, fitness).genome;
            });

    }
}
