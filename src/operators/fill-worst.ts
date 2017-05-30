import * as _ from "lodash";
import {
    best,
    bottom,
    Gene,
    Genome,
    IEvaluation,
    IGenomeOptions,
    top,
} from "../index";

// replaces the worst genomes with random ones
export function fillWorst<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    percent: number,
): Array<Genome<T>> {
    if (percent > 1 || percent < 0) {
        throw new Error(("percent must be a decimal between (0, 1)"));
    }

    const removed = bottom(genomes, fitness, percent).map((e) => e.genome);
    const culled = genomes.filter((g) => !_.includes(removed, g));
    const random = _.range(removed.length).map((i) => new Genome<T>(genomes[0].options));
    const filled = _.concat(culled, random);
    return filled;
}
