# enome 
## [![Build Status](https://travis-ci.org/fiberwire/enome.svg?branch=master)](https://travis-ci.org/fiberwire/enome)
## A Genome generation and evolution library

## Note: This library is still in the early stages of development, and should not be considered producion-ready.

### This library is written in TypeScript, and I recommend using it with a TypeScript project.

### There are a few different ways you can use enome.
1. `Natural Selection`
    -  Automatically evolves genomes based on their fitness.
2. `Artificial Selection`
    - Allows you to select which genomes will reproduce to spawn future generations
        - Genomes are presented in a queue-like manner, where you review and take action on genomes one at a time. 
3. `Artificial Pooled Selection`
    - Allows you to select which genomes will be parents to future generations
        - Parents are not recycled back into the general population queue, and are instead part of a separate pool of genomes that are exclusively used for reproduction.
        - You can set the size of the parent pool, and when the capacity is reached, any new additions will remove the oldest parent from the pool.
4. Go it on your own
    - You can use enome primitives (genomes and genes) however you want.
    - The premade population types are just there to make your life easier. If their functionality doesn't fit your needs, you're free to make your own, or not use one at all.
    - enome provides a host of operators for doing various things to/with genomes.

How enome generates `Genome`s:
- Generates a `sequence` of `values` between `zero` and `one`
- Groups those `values` into `Genes` by averaging them together
  - This results in the `Genome` being less sensitive to `mutation`
  - The sensitivity is customizable by varying the number of `values` that go into each `Gene`
- Groups those `Genes` into a `Genome`
  - `Genome` exposes a property called `g` that allows you to get the next `Gene` in the `Genome`.
    - This allows you to pass the `Genome` around, consuming its `Gene`s as you need them.

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
- write code that maps a `Genome` to whatever `object` you want to build by consuming genes one at a time.
- Define your "hyperparameters" in your `options` object.
- `mutate` and `evolve` that object by mutating and evolving the `Genome` that maps to that object.
- do it very simply, by providing upper and lower bounds for each variable you want to evolve.


# Install instructions
```
npm install enome
```

# Example usage for Natural Selection
say you want to evolve a list of three numbers between 1 and 100 that will add up to 256.

```
import * as _ from 'lodash';
import {
    Gene,
    Genome,
    IEvaluation,
    IGenomeOptions,
    NaturalSelection,
    NaturalSelectionOptions,
    replenish,
    FillType,
    MutateOp,
    MutateType,
    FitnessObjective,
    ReproduceType,
} from "enome";

// create interface that extends IGenomeOptions and contains 
// the options you'll need to create your object from your genome
interface IListOptions extends IGenomeOptions {
    min: number;
    max: number;
    length: number;
}

// create the function that will turn a genome into whatever object you want
// in this case, it will create an array of integers.
function createList(genome: Genome<IListOptions>): number[] {
    return _.range(genome.options.length)
        .map((i: number) => genome.g.int(genome.options.min, genome.options.max));
}

// create the function that will evaluate your genome
// in this case, it is finding the difference between the sum of the list and the target, 256
function fitness(genome: Genome<IListOptions>): IEvaluation<IListOptions, number[]> {
    const target = 256;

    const list = createList(replenish(genome));
    const sum = _.sum(list);
    const fit = Math.abs(target - sum);

    return { fitness: fit, genome, result: list };
}

// set up the options for your genome
const gOptions: IListOptions = {
    geneLength: 5,
    genomeLength: 3,
    length: 3,
    loopGenes: true,
    max: 100,
    min: 1,
};

// set up the options for your population
const pOptions: NaturalSelectionOptions = {
    fillPercent: 0.25,
    fillType: FillType.none,
    mutateOptions: {
        mutateChance: 0.15,
        mutateOp: MutateOp.sub,
        sampleSize: 5,
        type: MutateType.safeSampled,
    },
    objective: FitnessObjective.minimize,
    populationSize: 20,
    reproduceOptions: {
        sampleSize: 5,
        type: ReproduceType.normal,
    },
};

// create your population
const pop = new NaturalSelection(
    pOptions,
    gOptions,
    createList,
    fitness,
);

// evolve your population
const ev = pop.evolve$()
    .subscribe((e: IEvaluation<IListOptions, number[]>) => {
        const list = e.result;
        const f = e.fitness;
        const sum = _.sum(list);
        // do something with list
        console.log(`[${list}] -sum: ${sum} -error: ${f}`);
    });
```