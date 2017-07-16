import * as _ from "lodash";

import { Genome, IGenomeOptions, refresh, value } from "../src/index";

export interface IMock {
    genome: Genome<IGenomeOptions>;
    genomes: Array<Genome<IGenomeOptions>>;
    mutateChance: number;
    weights: number[];
    genomeOptions: IGenomeOptions;
}

function mockGenome(): Genome<IGenomeOptions> {
    return new Genome({
        geneLength: 1,
        genomeLength: 50,
        loopGenes: false,
    });
}

function mockGenomes(): Array<Genome<IGenomeOptions>> {
    return _.range(0, 10).map((i) => mockGenome());
}

function mockMutateChance(): number {
    return 0.5;
}

function mockWeights(): number[] {
    return _.range(0, 10).map((i) => value());
}

function mockGenomeOptions(): IGenomeOptions {
    return {
        geneLength: 1,
        genomeLength: 50,
        loopGenes: false,
    };
}

export function mocks(): IMock {
    return {
        genome: mockGenome(),
        genomeOptions: mockGenomeOptions(),
        genomes: mockGenomes(),
        mutateChance: mockMutateChance(),
        weights: mockWeights(),
    };
}
