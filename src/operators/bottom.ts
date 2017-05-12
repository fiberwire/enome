import { worst } from "operators/worst";
import { Evaluation } from "evalutation";
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { Nucleotide } from "genotypes/nucleotide";

export function bottom<T extends GenomeOptions>(
    genomes: Genome<T>[],
    threshold: number = 0.5,
    fitness: (genome: Genome<T>) => Evaluation<T>
): Evaluation<T>[] {
    let w = worst(genomes, fitness);

    let evals = genomes.map(fitness).sort((a, b) => {
        if (a.fitness < b.fitness) return -1;
        else return 1;
    });

    //select just the ones that make the cut
    return new Nucleotide(threshold).elements(evals);
}