
import { Genome, EnomeOptions, Evaluation, Nucleotide } from "../index";
import { best } from './index';

export function top<T extends EnomeOptions>(gens: Genome<T>[], cutoff: number = 0.5, fitness: (genome: Genome<T>) => Evaluation<T>): Evaluation<T>[] {
    let b = best(gens, fitness);

    let evals = gens.map(fitness).sort((a, b) => {
        if (a.fitness > b.fitness)
            return -1;
        else return 1;
    });

    //select just the ones that make the cut
    return new Nucleotide(cutoff).elements(evals);
}