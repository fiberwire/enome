
import { Genome, GenomeOptions, Evaluation } from "../index";
import * as _ from 'lodash';

export function best<T extends GenomeOptions>(gens: Genome<T>[], fitness: (genome: Genome<T>) => Evaluation<T>): Evaluation<T> {
    return _.max(gens.map(fitness));
}