# enome 
## [![Build Status](https://travis-ci.org/fiberwire/enome.svg?branch=master)](https://travis-ci.org/fiberwire/enome)
## A Genome generation library

## Note: This library is still in the early stages of active development, and should not be considered producion-ready by any means.

### This library is written in TypeScript, and I recommend using it with a TypeScript project.

### There are a few different ways you can use enome.

1. `Natural Selection`
    -  Automatically evolves genomes based on their fitness.
2. `Artificial Selection`
    - Allows you to select which genomes will reproduce to spawn future generations
        - Genomes are presented in a queue-like manner, where you review and take action on genomes one at a time. 
3. Artificial Pooled Selection
    - Allows you to select which genomes will be parents to future generations
        - Parents are not recycled back into the general population queue, and are instead part of a separate pool of genomes that are exclusively used for reproduction.
        - You can set the size of the parent pool, and when the capacity is reached, any new additions will remove the oldest parent from the pool.
4. Go it on your own
    - You can use enome primitives (genomes and nucleotides) however you want.
    - The premade population types are just there to make your life easier. If their functionality doesn't fit your needs, you're free to make your own, or not use one at all.
    - enome provides a host of operators for doing various things to/with genomes.

How enome generates `Genome`s:
- Generates a `sequence` of `values` between `zero` and `one`
- Groups those `values` into `Nucleotides` by averaging them together
  - This results in the `Genome` being less sensitive to `mutation`
  - The sensitivity is customizable by varying the number of `values` that go into each `Nucleotide`
- Groups those `Nucleotides` into a `Genome`
  - `Genome` exposes a property called `nucleo` that allows you to get the next `Nucleotide` in the `Genome`.
    - This allows you to pass the `Genome` around, consuming its `Nucleotide`s as you need them.

How enome determines the `fitness` of a `Genome`:
- You define your own `fitness` function.
    - Generally, your `fitness` function should accept a `Genome` and return an `Evaluation`.
    - Your fitness function will necessarily create an object from your genome that it will test.
    - `Evaluation` is just an interface that has the following properties
        - `fitness`: `number`
            - the relative `fitness` of the `Genome` being evaluated.
        - `genome`: `Genome`
            - the genome that is being evaluated.
        - `result`: `T`
            - the object that is created from your genome.

What enome allows you to do:
 - write code that maps a `Genome` to whatever `object` you want to build by consuming nucleotides one at a time.
 - Define your hyperparameters in your `options` object.
 - `mutate` and `evolve` that object by mutating and evolving the `Genome` that maps to that object.
 - do it very simply, by providing upper and lower bounds for each variable you want to evolve.


 # Example usage for Natural Selection
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
} from 'enome';

// create an interface that adds your custom options to GenomeOptions
interface ListOptions extends GenomeOptions {
    min: number,
    max: number,
    length: number
}

//define a function that will map a Genome to whatever kind of object you want.
function createList(genome: Genome<ListOptions>): number[] {
    return _.range(genome.options.length)
        .map(i => genome.nucleo.int(genome.options.min, genome.options.max));
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
let pop = new NaturalSelection(
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