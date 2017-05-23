"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutate_type_1 = require("../enums/mutate-type");
const _ = require("lodash");
const readline = require("readline-sync");
const index_1 = require("../index");
let createLetters = (genome) => {
    let letters = _.range(genome.options.length)
        .map(i => {
        return genome.nucleo.letter();
    })
        .join('');
    return letters;
};
let gOptions = {
    genomeLength: 10,
    nucleotideLength: 50,
    extendNucleotides: true,
    length: 10
};
let pOptions = {
    initSize: 10,
    minSize: 5,
    maxSixe: 15,
    mutateOptions: {
        mutateChance: 15,
        mutateType: mutate_type_1.MutateType.avg,
        sampled: false,
        safe: false,
        sampleSize: 5
    }
};
let pop = new index_1.ArtificialSelection(pOptions, gOptions, createLetters);
pop.genomes$
    .subscribe(genomes => {
    let genome = genomes[0];
    let letters = genomes
        .map(g => createLetters(g));
    let gstr = letters
        .join(' ');
    console.log(`letters [${letters.length}]: ${_.takeRight(letters, letters.length - 1)}`);
    console.log(`current: ${letters[0]}\n`);
    let answer = readline.question('(1) keep\n(2) replace\n(3) reproduce\n(4) kill\n(5) random\n(6) generate\n');
    switch (answer) {
        case 'keep':
        case '1':
            //requeues the current genome to the end of the array
            pop.keep();
            break;
        case 'replace':
        case '2':
            //removes the current genome, adds a new offspring of the whole array to the end
            pop.replace();
            break;
        case 'reproduce':
        case '3':
            //adds a new offspring of the whole array to the end
            pop.reproduce();
            break;
        case 'kill':
        case '4':
            //removes the current genome
            pop.kill();
            break;
        case 'random':
        case '5':
            //removes the current genome, adds a new random genome to the end
            pop.random();
            break;
        case 'generate':
        case '6':
            //adds a new genome to the end
            pop.generate();
            break;
        default:
            //keep if input is invalid
            pop.keep();
            break;
    }
});
//# sourceMappingURL=letters.js.map