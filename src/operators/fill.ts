
import { EnomeOptions, Genome } from "../index";

export function fill<T extends EnomeOptions>(gens: Genome<T>[], n: number): Genome<T>[] {
    while (gens.length < n) {
        let g = new Genome({ genomeLength: 4, nucleotideLength: 1 });

        //select two random parents, and create an offspring using two random weights

        let p1 = g.nucleo.element(gens);
        let p2 = g.nucleo.element(gens);
        let w1 = g.nucleo.float(0, 1);
        let w2 = g.nucleo.float(0, 1);

        gens.unshift(
            p1.reproduce(p2, w1, w2),
        );
    }

    return gens;
}