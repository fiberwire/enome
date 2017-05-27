import * as _ from "lodash";
import { Genome, IEvaluation, IGenomeOptions } from "../index";

export function avgFitness<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
): number {
    return _.meanBy(genomes, (g) => fitness(g).fitness);
}
