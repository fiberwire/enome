# enome 
## [![Build Status](https://travis-ci.org/fiberwire/enome.svg?branch=master)](https://travis-ci.org/fiberwire/enome)
## A Genome generation and evolution library

## Note: This library is still in the early stages of development, and should not be considered producion-ready.

### This library is written in TypeScript, and I recommend using it with a TypeScript project.

## What is enome?
enome is a javascript/typescript library that allows you to asynchronously (using rxjs) evolve any kind of object you can think of.

## enome has three main parts to its evolution system.

* ### `Organism`:
    * an `Organism` is just an object that contains a `genotype` and a `phenotype` and has the ability to interact with an `Environment`.
        * a `genotype`, in this case, is a `Genome`, which contains genetic information that you use to create the `phenotype`.
        * a `phenotype`, in this case, is whatever kind of object you would like to evolve.
    * `Organisms` record data as they are interacting with the `Environment`.
        * Once the `Organism` has done a specified number of `interactions` or has reached its specified `lifeSpan`, it queues itself up for evaluation by its `Population`.
    
* ### `Environment`:
    * an `Environment` is essentially just an asynchronous state container.
    * You interact with an `Environment` by sending `IStateUpdates` to its `state` `Subject`.
    * an `Environment` may have multiple `Organisms` interacting with it at a time.
    * `Environments` have an `interactionRate` property which you can set that limits how often it accepts `IStateUpdates` (think of it like a frame rate).
        * `Environments` deal with multiple asynchronous sources of incoming `IStateUpdates` by buffering them over time based on the `interactionRate` and then randomly choosing between ones that were based on the current `state`, otherwise state updates could happen out of order (think of it like an asynchronous way of having a shared order of events even though everything is happening out of order, technically).

* ### `Population`
    * `Populations` create `Organisms` and tell them which environments to interact with.
    * `Populations` are also in charge of determining how `Organisms` evolve.
        * when a `Population` receives an `Organism` to evaluate, it looks at the data that the `Organism` collected to determine its `fitness`.
            * You specify the function that determines the `fitness` of the `Organism` based on its data.
        * when a `Population` finishes evaluating an `Organism`, it then determines what it wants to do with the `genotype` of the `Organism` between three options:
            1. `mutate`
                * mutates the `genotype` based on options that you set
                * creates a new `Organism` with the mutated `genotype`. 
            2. `reproduce`
                * produces an offspring `genotype` by mixing the `genotypes` of all the other `Organisms` in the `Population`. 
                * creates a new `Organism` with the offspring `genotype`. 
            3. `randomize`
                * creates a new `Organism` with a randomly generated `Genome`.
                * this is good for introducing genetic variety into the population so it doesn't hit a local minimum
        * The way it determines what to do with the `genotype` is by randomly choosing based on relative weights that you give it.
            * for instance, you could give it
            
            ```  
            {
                mutate: .15,
                reproduce: .75,
                randomize: .1
            }
            ```

            which would give mutation a 15% chance, reproduction a 75% chance, and randomization a 10% chance.
                

## Underlying the evolution system are `Genomes` and `Genes`:
* ### `Genome`:
    * A `Genome` is just a container for genetic information, or a `sequence`.
    * At its heart, a `sequence` is just an array of numbers between 0 and 1.
    * When created, the `Genome` takes that `sequence` and produces `Genes` from it.
    * `Genome` provides the `g` property which allows you to get the next `Gene` in the list, so you can consume them one by one in a queue-like manner.
* ### `Gene`:
    * A `Gene` is just a container for a `value` between 0 and 1.
    * `Genes` give you methods that interpolate their value into a value that it useful when creating the `phenotype`.
        * for instance, say your phenotype is a first and last name:
        ```
        interface Name {
            first: string;
            last: string;
        }

        interface NameOptions extends IGenomeOptions {
            firstMinLength: number;
            firstMaxLength: number;
            lastMinLength: number;
            lastMaxLength: number;
        }

        public createPhenotype(genome: Genome<NameOptions>): Name {

            // determine length of first name
            const firstLength = genome.g.int(
                genome.options.firstMinLength, 
                genome.options.firstMaxLength
            );

            // determine length of last name
            const lastLength = genome.g.int(
                genome.options.lastMinLength, 
                genome.options.lastMaxLength
            );

            //create first name
            const first = _.range(firstLength)
                .map(i => genome.g.letter())
                .reduce((first, letter) => `${first}${letter}`)

            // create last name
            const last = _.range(lastLength)
                .map(i => genome.g.letter())
                .reduce((last, letter) => `${last}${letter}`)

            return { first, last };
        }
        
        ```

How enome generates `Genome`s:
- Generates a `sequence` of `values` between 0 and 1.
- Groups those `values` into `Genes` by averaging them together
  - This results in the `Genome` being less sensitive to `mutation`
  - The sensitivity is customizable by varying the number of `values` that go into each `Gene`
- Groups those `Genes` into a `Genome`
  - `Genome` exposes a property called `g` that allows you to get the next `Gene` in the `Genome`.
    - This allows you to pass the `Genome` around, consuming its `Genes` as you need them.


# Install instructions
```
npm install enome
```

# Example usage