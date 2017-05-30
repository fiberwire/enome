import * as _ from "lodash";
import * as readline from "readline-sync";
import { Observable } from "rx";
import { MutateOp } from "../enums/mutate-op";
import { MutateType } from "../enums/mutate-type";
import {
    ArtificialSelection,
    Genome,
    IArtificialSelectionOptions,
    IGenomeOptions,
} from "../index";

interface ILettersOptions extends IGenomeOptions {
    length: number;
}

const createLetters = (genome: Genome<ILettersOptions>) => {
    const letters = _.range(genome.options.length)
        .map((i) => {
            return genome.g.letter();
        })
        .join("");
    return letters;
};

const gOptions: ILettersOptions = {
    loopGenes: true,
    genomeLength: 10,
    length: 10,
    geneLength: 50,
};

const pOptions: IArtificialSelectionOptions = {
    initSize: 10,
    maxSize: 15,
    minSize: 5,
    mutateOptions: {
        mutateChance: 15,
        mutateOp: MutateOp.avg,
        sampleSize: 5,
        type: MutateType.safe,
    },
};

const pop = new ArtificialSelection(
    pOptions,
    gOptions,
    createLetters,
);

pop.genomes$
    .subscribe((genomes) => {
        const genome = genomes[0];

        const letters = genomes
            .map((g) => createLetters(g));

        const gstr = letters
            .join(" ");

        const answer: string = readline.question(
            "(1) keep\n(2) replace\n(3) reproduce\n(4) kill\n(5) random\n(6) generate\n",
        );

        switch (answer) {
            case "keep":
            case "1":
                // requeues the current genome to the end of the array
                pop.keep();
                break;
            case "kill":
            case "2":
                // removes the current genome, adds a new offspring of the whole array to the end
                pop.kill();
                break;
            case "reproduce":
            case "3":
                // adds a new offspring of the whole array to the end
                pop.reproduce();
                break;
            case "delete":
            case "4":
                // removes the current genome
                pop.delete();
                break;
            case "random":
            case "5":
                // removes the current genome, adds a new random genome to the end
                pop.random();
                break;
            case "generate":
            case "6":
                // adds a new genome to the end
                pop.generate();
                break;
            default:
                // keep if input is invalid
                pop.keep();
                break;
        }
    });
