import * as _ from "lodash";
import {
    Genome,
    IEvaluation,
    IGenomeOptions,
    Nucleotide,
} from "../index";

export function top<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    fitness: (genome: Genome<T>) => IEvaluation<T, U>,
    percent: number = 0.5,
): Array<IEvaluation<T, U>> {
    // sort evaluations of genomes by fitness, descending order
    const t = _.sortBy(genomes.map(fitness), (e) => e.fitness).reverse();

    // select just the ones that make the cut
    return new Nucleotide(percent).elements(t);
}
