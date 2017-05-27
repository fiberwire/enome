import * as _ from "lodash";
import { Genome, IEvaluation, IGenomeOptions } from "../index";

export function worst<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    fitness: (genome: Genome<T>) => IEvaluation<T, U>,
): IEvaluation<T, U> {
    return _.minBy(genomes.map(fitness), (e) => e.fitness);
}
