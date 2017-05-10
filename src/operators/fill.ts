
import { EnomeOptions, Genome } from "../index";

export function fill<T extends EnomeOptions>(gens: Genome<T>[], n: number): Genome<T>[] {
    while (gens.length < n) {
        let g = new Genome({ genomeLength: 10, nucleotideLength: 1 });

        //select two random parents, and create an offspring using two random weights
        gens.unshift(
            g.nucleo.element(gens)
                .reproduce(g.nucleo.element(gens),
                g.nucleo.int(0, 1),
                g.nucleo.int(0, 1))
        );
    }

    return gens;
}