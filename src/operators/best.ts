
import { Genome, EnomeOptions, Evaluation } from "../index";
import * as _ from 'lodash';

export function best<T extends EnomeOptions>(gens: Genome<T>[], fitness: (genome: Genome<T>) => Evaluation<T>): Evaluation<T> {
    return _.max(gens.map(fitness));
}