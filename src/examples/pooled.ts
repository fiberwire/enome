import * as _ from "lodash";
import { MutateOp } from "../enums/mutate-op";
import { MutateType } from "../enums/mutate-type";
import { Genome } from "../genotypes/genome";
import { IArtificialPooledSelectionOptions } from "../options/artificial-pooled-selection-options";
import { IGenomeOptions } from "../options/genome-options";
import { ArtificialPooledSelection } from '../populations/artificial-pooled-selection';

interface IStringOptions extends IGenomeOptions {
    length: number;
}

const gOptions: IStringOptions = {
    extendNucleotides: true,
    genomeLength: 20,
    length: 6,
    nucleotideLength: 1,
};

const pOptions: IArtificialPooledSelectionOptions = {
    initSize: 9,
    maxParentPoolSize: 5,
    maxSize: 10,
    minParentPoolSize: 2,
    minSize: 5,
    mutateOptions: {
        mutateChance: 0.15,
        mutateOp: MutateOp.avg,
        sampleSize: 1,
        type: MutateType.normal,
    },
};

const create = (genome: Genome<IStringOptions>) => {
    return _.range(gOptions.length)
        .map((i) => {
            return genome.nucleo.letter();
        });
};

const pop = new ArtificialPooledSelection(
    pOptions,
    gOptions,
    create,
);

pop.keep();
