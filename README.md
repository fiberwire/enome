# enome 
## [![Build Status](https://travis-ci.org/fiberwire/enome.svg?branch=master)](https://travis-ci.org/fiberwire/enome)
## A Genome generation library

## Note: This library is still in the early stages of active development, and should not be considered producion-ready by any means. I haven't finalized the API for the initial release, and as a result, it has yet to be published to NPM.

### This library is written in TypeScript, and I recommend using it with a TypeScript project.

What enome does:
- Generates a `sequence` of `values` between `zero` and `one`
- Groups those `values` into `Nucleotides` by averaging them together
  - This results in the `Genome` being less sensitive to `mutation`
  - The sensitivity is customizable by varying the number of `values` that go into each `Nucleotide`
- Groups those `Nucleotides` into a `Genome`
  - `Genome` exposes a property called `nucleo` that allows you to get the next `Nucleotide` in the `Genome`.
    - This allows you to pass the `Genome` around, consuming its `Nucleotide`s as you need them.
- accepts an `options` object, which must implement `GenomeOptions`
  - `GenomeOptions` just has a few essential properties
    - `genomeLength` determines how many `Nucleotides` the `Genome` will contain.
    - `nucleotideLength` determines how many values will average together to form a `Nucleotide`
- Automatically evolves a `Population` of `Genome`s.
- Makes extensive use of `chance.js`, `d3-interpolate`, and `lodash`.

What enome allows you to do:
 - write code that maps a `Genome` to whatever `object` you want to build.
 - Fefine your hyperparameters in your `options` object.
 - `mutate` and `evolve` that object by mutating and evolving the `Genome` that maps to that object.
 - do it very simply, by providing upper and lower bounds for each variable you want to evolve.


 # Example usage
 say you want to evolve a list of three numbers between 1 and 100 that will add up to 256.

```
import * as _ from 'lodash';
import {
    sampledReproduce,
    best,
    Evaluation,
    Genome,
    GenomeOptions,
    Nucleotide,
    Population,
    PopulationOptions,
    replenish
} from '../index';

// create an interface that adds your custom options to GenomeOptions
interface ListOptions extends GenomeOptions {
    min: number,
    max: number,
    length: number
}

//define a function that will map a Genome to whatever kind of object you want.
function createList(genome: Genome<ListOptions>): number[] {
    return _.range(0, genome.options.length)
        .map((i: number) => {
            let n: Nucleotide = genome.nucleo;
            i = n.int(genome.options.min, genome.options.max);
            return genome.nucleo.int(genome.options.min, genome.options.max);
        });
}

//define a function that will determine the fitness of a Genome.
function fitness(genome: Genome<ListOptions>): Evaluation<ListOptions, number[]> {
    let target = 256;

    let list = createList(replenish(genome));
    let sum = _.sum(list);
    let error = Math.abs(target - sum);
    
    return { fitness: 1/error, genome: genome, result: list };
}

//set genome options
let gOptions: ListOptions = {
    genomeLength: 10,
    nucleotideLength: 1,
    min: 1,
    max: 100,
    length: 3,
    extendNucleotides: false
}

//set population options
let pOptions: PopulationOptions = {
    populationSize: 20,
    fillType: 'random', //can be either worst or random
    fillPercent: 0.15,
    mutateOptions: {
        safe: false,
        sampled: false,
        sampleSize: 5,
        mutateChance: 0.15,
        mutateType: 'sub' //can be either sub or avg
    },
    reproduceOptions: {
        safe: true,
        sampled: false,
        sampleSize: 5
    }
};

//create population
let pop = new Population(
    pOptions,
    gOptions,
    createList,
    fitness
);

//evolve synchronously
let evSync = pop.evolve(100);
let list = evSync.result;
let fit = evSync.fitness;
console.log(`\t`, `list: ${list}, sum: ${_.sum(list)}, fitness: ${fit}`);

//or reactively
let ev = pop.evolve$(100)
    .subscribe(e => {
        let list = e.result;
        let fit = e.fitness;
        console.log(`\t`, `list: ${list}, sum: ${_.sum(list)}, fitness: ${fit}`);
    },
    err => console.log(err))

```

