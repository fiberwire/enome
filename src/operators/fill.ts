import * as _ from "lodash";
import { Genome } from "../genotypes/genome";
import { IGenomeOptions } from "../options/genome-options";
import { reproduce } from "./reproduction/reproduce";

export function fill<T extends IGenomeOptions>(
    gens: Array<Genome<T>>,
    n: number,
): Array<Genome<T>> {
    // create offspring to fill array with
    const offspring: Array<Genome<T>> =
        _.range(0, n - gens.length)
            .map((i) => {
                const g = new Genome(gens[0].options);

                // select two random parents, and create an offspring using two random weights
                const p1 = g.nucleo.element(gens);
                const p2 = g.nucleo.element(gens);
                const w1 = g.nucleo.float(0, 1);
                const w2 = g.nucleo.float(0, 1);
                return reproduce(p1, p2, w1, w2);
            });

    return _.concat(gens, offspring);
}
