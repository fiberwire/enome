import * as _ from "lodash";
import {
    Gene,
    Genome,
    IEvaluation,
    IGenomeOptions,
} from "../index";

export function bottom<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    fitness: (genome: Genome<T>) => IEvaluation<T, U>,
    percent: number = 0.5,
): Array<IEvaluation<T, U>> {
    // sort evaluations of genomes by fitness, ascending order
    const b = _.sortBy(genomes.map(fitness), (e) => e.fitness);

    // select just the ones that make the cut
    return new Gene(percent).elements(b);
}
