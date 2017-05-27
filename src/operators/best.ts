import * as _ from "lodash";
import { Genome, IEvaluation, IGenomeOptions } from "../index";

export function best<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    fitness: (genome: Genome<T>) => IEvaluation<T, U>,
): IEvaluation<T, U> {
    // best genome from genomes, based on fitness
    return _.maxBy(genomes.map(fitness), (e) => e.fitness);
}
