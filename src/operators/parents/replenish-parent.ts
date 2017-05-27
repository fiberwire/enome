import { Genome } from "../../genotypes/genome";
import { IParent } from "../../interfaces/parent";
import { IGenomeOptions } from "../../options/genome-options";

// returns a new parent with a new genome that has the same options and sequence as the provided genome,
// essentially replenishing its nucleos
export function replenishParent<T extends IGenomeOptions>(parent: IParent<T>): IParent<T> {
    return { genome: new Genome(parent.genome.options, parent.genome.sequence), age: parent.age };
}
