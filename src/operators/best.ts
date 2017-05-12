
import { Genome, GenomeOptions, Evaluation } from "../index";
import * as _ from 'lodash';

export function best<T extends GenomeOptions>(
    genomes: Genome<T>[],
    fitness: (genome: Genome<T>) => Evaluation<T>
): Evaluation<T> {
    return _.maxBy(genomes.map(fitness), e => e.fitness);
}