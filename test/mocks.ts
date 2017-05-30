import { Gene } from "genotypes/gene";
import * as _ from "lodash";
import { FillType } from "../src/enums/fill-type";
import { FitnessObjective } from "../src/enums/fitness-objective";
import { MutateOp } from "../src/enums/mutate-op";
import { MutateType } from "../src/enums/mutate-type";
import { ReproduceType } from "../src/enums/reproduce-type";
import { Genome } from "../src/genotypes/genome";
import { IEvaluation } from "../src/interfaces/evaluation";
import { IParent } from "../src/interfaces/parent";
import { replenish } from "../src/operators/replenish";
import { value } from "../src/operators/value";
import { IArtificialPooledSelectionOptions } from "../src/options/artificial-pooled-selection-options";
import { IArtificialSelectionOptions } from "../src/options/artificial-selection-options";
import { IGenomeOptions } from "../src/options/genome-options";
import { NaturalSelectionOptions } from "../src/options/natural-selection-options";
import { ArtificialPooledSelection } from "../src/populations/artificial-pooled-selection";
import { ArtificialSelection } from "../src/populations/artificial-selection";
import { NaturalSelection } from "../src/populations/natural-selection";

export interface IMock {
    genome: Genome<IGenomeOptions>;
    genomes: Array<Genome<IGenomeOptions>>;
    nsFitness: (g: Genome<IGenomeOptions>) => IEvaluation<IGenomeOptions, number[]>;
    mutateChance: number;
    weights: number[];
    natural: NaturalSelection<IGenomeOptions, NaturalSelectionOptions, number[]>;
    nsCreate: (g: Genome<IGenomeOptions>) => number[];
    genomeOptions: IGenomeOptions;
    naturalOptions: NaturalSelectionOptions;
    artificial: ArtificialSelection<IGenomeOptions, IArtificialSelectionOptions, string[]>;
    asCreate: (g: Genome<IGenomeOptions>) => string[];
    parent: IParent<IGenomeOptions>;
    pooled: ArtificialPooledSelection<IGenomeOptions, IArtificialPooledSelectionOptions, string[]>;
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

function mockNSCreate(genome: Genome<IGenomeOptions>): number[] {
    return genome.gs(10).map((n: Gene) => n.float(0, 0.1));
}

function mockASCreate(genome: Genome<IGenomeOptions>): string[] {
    return genome.gs(10).map((n: Gene) => n.letter());
}

function mockNSFitness(gen: Genome<IGenomeOptions>) {
    const list = mockNSCreate(replenish(gen));

    return {
        fitness: _.sum(list),
        genome: gen,
        result: list,
    };
}

function mockMutateChance(): number {
    return 0.5;
}

function mockWeights(): number[] {
    return _.range(0, 10).map((i) => value());
}

function mockNSOptions(): NaturalSelectionOptions {
    return {
        fillPercent: 0.15,
        fillType: FillType.random,
        mutateOptions: {
            mutateChance: 0.15,
            mutateOp: MutateOp.sub,
            sampleSize: 5,
            type: MutateType.safeSampled,
        },
        objective: FitnessObjective.maximize,
        populationSize: 20,
        reproduceOptions: {
            sampleSize: 5,
            type: ReproduceType.safe,
        },
    };
}

function mockASOptions(): IArtificialSelectionOptions {
    return {
        initSize: 10,
        maxSize: 15,
        minSize: 5,
        mutateOptions: {
            mutateChance: 0.15,
            mutateOp: MutateOp.avg,
            sampleSize: 5,
            type: MutateType.normal,
        },
    };
}

function mockAPSOptions(): IArtificialPooledSelectionOptions {
    return {
        initSize: 5,
        maxParentPoolSize: 5,
        maxSize: 10,
        minParentPoolSize: 2,
        minSize: 5,
        mutateOptions: {
            mutateChance: 0.15,
            mutateOp: MutateOp.avg,
            sampleSize: 5,
            type: MutateType.normal,
        },
    };
}

function mockGenomeOptions(): IGenomeOptions {
    return {
        geneLength: 1,
        genomeLength: 50,
        loopGenes: false,
    };
}

function mockNS(): NaturalSelection<IGenomeOptions, NaturalSelectionOptions, number[]> {
    return new NaturalSelection(
        mockNSOptions(),
        mockGenomeOptions(),
        mockNSCreate,
        mockNSFitness,
    );
}

function mockAS(): ArtificialSelection<IGenomeOptions, IArtificialSelectionOptions, string[]> {
    return new ArtificialSelection(
        mockASOptions(),
        mockGenomeOptions(),
        mockASCreate,
    );
}

function mockParent(): IParent<IGenomeOptions> {
    return { genome: mockGenome(), age: 1 };
}

function mockPooled(): ArtificialPooledSelection<IGenomeOptions, IArtificialPooledSelectionOptions, string[]> {
    return new ArtificialPooledSelection(
        mockAPSOptions(),
        mockGenomeOptions(),
        mockASCreate,
    );
}

export function mocks(): IMock {
    return {
        artificial: mockAS(),
        asCreate: mockASCreate,
        genome: mockGenome(),
        genomeOptions: mockGenomeOptions(),
        genomes: mockGenomes(),
        mutateChance: mockMutateChance(),
        natural: mockNS(),
        naturalOptions: mockNSOptions(),
        nsCreate: mockNSCreate,
        nsFitness: mockNSFitness,
        parent: mockParent(),
        pooled: mockPooled(),
        weights: mockWeights(),
    };
}
