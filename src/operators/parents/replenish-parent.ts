import { Parent } from '../../interfaces/parent';
import { GenomeOptions } from '../../options/genome-options';
import { Genome } from '../../genotypes/genome';

//returns a new parent with a new genome that has the same options and sequence as the provided genome,
//essentially replenishing its nucleos
export function replenishParent<T extends GenomeOptions>(parent: Parent<T>): Parent<T> {
    return { genome: new Genome(parent.genome.options, parent.genome.sequence), age: parent.age };
}