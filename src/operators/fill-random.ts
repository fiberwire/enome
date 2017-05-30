import { Gene } from "genotypes/gene";
import * as _ from "lodash";
import { Genome } from "../genotypes/genome";
import { IGenomeOptions } from "../options/genome-options";

// randomly replaces a percent of genomes (regardless of fitness) with random ones
export function fillRandom<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    percent: number,
): Array<Genome<T>> {
    if (percent > 1 || percent < 0) {
        throw new Error(("percent must be a number between 0 (inclusive) and 1 (inclusive)"));
    }

    const removed = new Gene(percent).elements(_.shuffle(genomes));
    const culled = genomes.filter((g) => !_.includes(removed, g));
    const random = _.range(removed.length).map((i) => new Genome(genomes[0].options));
    const filled = _.concat(culled, random);

    return filled;
}
