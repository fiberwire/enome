
import { Genome, GenomeOptions, Evaluation, Nucleotide } from "../index";
import { best } from "./best";

export function top<T extends GenomeOptions>(
    genomes: Genome<T>[],
    threshold: number = 0.5,
    fitness: (genome: Genome<T>) => Evaluation<T>
): Evaluation<T>[] {
    let b = best(genomes, fitness);

    let evals = genomes.map(fitness).sort((a, b) => {
        if (a.fitness > b.fitness) return -1;
        else return 1;
    });

    //select just the ones that make the cut
    return new Nucleotide(threshold).elements(evals);
}