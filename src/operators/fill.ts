
import { GenomeOptions, Genome, reproduce } from "../index";
import * as _ from 'lodash';

export function fill<T extends GenomeOptions>(
    gens: Genome<T>[],
    n: number
): Genome<T>[] {
    //create offspring to fill array with
    let offspring: Genome<T>[] =
        _.range(0, n - gens.length)
            .map(i => {
                let g = new Genome(gens[0].options);

                //select two random parents, and create an offspring using two random weights
                let p1 = g.nucleo.element(gens);
                let p2 = g.nucleo.element(gens);
                let w1 = g.nucleo.float(0, 1);
                let w2 = g.nucleo.float(0, 1);
                return reproduce(p1, p2, w1, w2)
            });

    return _.concat(gens, offspring);
}