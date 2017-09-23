# enome 
## [![Build Status](https://travis-ci.org/fiberwire/enome.svg?branch=master)](https://travis-ci.org/fiberwire/enome)
## A Genome generation and evolution library

## Note: This library is still in the early stages of development, and should not be considered producion-ready.

### This library is written in TypeScript, and I recommend using it with a TypeScript project.

## What is enome?
enome is a javascript/typescript library that allows you to asynchronously (using rxjs) evolve any kind of object you can think of on node and in the browser.

## enome has three main parts to its evolution system.

* ### `Organism`:
    * an `Organism` is an object that contains a `genotype` and a `phenotype`, has the ability to transform a `genotype` into a `phenotype`, and has the ability to interact with an `Environment`.
        * a `genotype`, in this case, is a `Genome`, which contains genetic information that you use to create a `phenotype`.
        * a `phenotype`, in this case, is whatever kind of object you would like to evolve.
    * `Organisms` record data as they are interacting with the `Environment`.
        * Once the `Organism` has done a specified number of `interactions`, it evaluates itself based on the data it collected and sends the evaluation to the `Population`, which will decide how to evolve the organism.
        * You specify the function that determines the `fitness` of the `Organism` based on its collected data.
    
* ### `Environment`:
    * an `Environment` is essentially an asynchronous state container.
    * In order to interact with an `Environment`:
        * subscribe to its `states` observable to receive state updates
        * create `interactions` based on the state updates received
        * call its `nextInteraction(interaction)` method to send interactions.
    * an `Environment` may have multiple `Organisms` interacting with it at a time.
    * `Environments` have an `interactionRate` property which you can set that limits how often it accepts `IStateUpdates` (think of it like a frame rate).
        * `Environments` deal with multiple asynchronous sources of incoming `IStateUpdates` by buffering them over time based on the `interactionRate` and then randomly choosing between them. The `Environment` will only accept state updates that are based on the current `state`, otherwise state updates could happen out of order (think of it like an asynchronous way of having a shared order of events even though everything is happening out of order, technically).

* ### `Population`
    * `Populations` populate environments with organisms.
    * `Populations` are also in charge of determining how `Organisms` evolve.
        * when a `Population` receives an evaluation, it looks at the `fitness` and determines what it wants to do with the `genotype`.
            * `Populations` can update the genotype in the following ways:
                * `Reproduce` will mix the genomes of the top organisms in the population based on fitness. (You can specify the percentage of organisms that qualifies as "top", which lets you determine whether you want to refine what is already working well or find new solutions)
                * `Mutate` will give each value in the Genome's sequence a chance to mutate and has two different mutation methods to choose from.
                    * `sub` will substitute the value for a new randomly generated one.
                    * `avg` will average the value with a new randomly generated one.
                * `Randomize` will replace the genome with a new randomly generated one (using the same options).
            * By default, `Populations` will choose between the different update methods randomly based on an array of weights that you provide.
                

    

## Underlying the evolution system are `Genomes` and `Genes`:
* ### `Genome`:
    * A `Genome` is a container for genetic information, or a `sequence`.
    * At its heart, a `sequence` is an array of numbers between 0 and 1.
    * When created, the `Genome` takes that `sequence` and produces `Genes` from it.
    * `Genome` provides the `g` property which allows you to get the next `Gene` in the list, so you can consume them one by one in a queue-like manner.
* ### `Gene`:
    * A `Gene` is a container for a `value` between 0 and 1.
    * `Genes` give you methods that interpolate their value into a value that is useful when creating the `phenotype`.
        * `int: number` - gives you an integer, for when you need whole numbers, such as the number of legs an insect should have.
            ```
            const insect = {
                legs: genome.g.int(minLegs, maxLegs)
            }
            ```
        * `float: number` - gives you a floating point number, for when you need decimal numbers, such as how long an insects legs should be.
            ```
            const insect = {
                ...
                legLength: genome.g.float(minLegLength, maxLegLength)
            }
            ```
        * `bool` - true or false, for when your phenotype has binary properties, such as whether an insect can swim/survive in water.
            ```
            const insect = {
                ...
                aquatic: genome.g.bool()
            }
            ```
        * `element` - picks an element out of an array, for when you need to choose between different options, such as what an insect eats.
            ```
            const insect = {
                ...
                diet: genome.g.element(["blood", "insects", "grass"])
            }
            ```
        * There are more methods for different types of values 

    ### Insect phenotype creation example:

        ```
        // define your phenotype
        interface Insect {
            legs: number;
            legLength: number;
            aquatic: boolean;
            diet: string
        }

        //define your genotype
        interface InsectOptions extends IGenomeOptions {
            minLegs: number;
            maxLegs: number;
            minLegLength: number;
            maxLegLength: number;
            diets: string[]; // could use an enum instead of strings, but for this example, I'm trying to keep it simple
        }

        // define the function that translates your genotype into your phenotype
        createPhenotype(genome: Genome<InsectOptions>): Insect {

            // determine number of legs
            const legs = genome.g.int(
                genome.options.minLegs, 
                genome.options.maxLegs
            );

            // determine length of legs
            const legLength = genome.g.float(
                genome.options.minLegLength,
                genome.options.maxLegLength
            );

            // determine whether aquatic
            const aquatic = genome.g.bool()

            // determine diet
            const diet = genome.g.element(
                genome.options.diets
            );

            return { 
                legs, 
                legLength, 
                aquatic, 
                diet 
            };
        }

        // define the parameters of your insects
        const insectOptions = {
            genomeLength: 4, // the total number of genes needed to create an insect
            minLegs: 6,
            maxLegs: 100,
            minLegLength: 1,
            maxLegLength: 30,
            diets: [
                "blood",
                "insects",
                "grass"
            ]
        }

        // generate a random insect genome
        const genotype = new Genome(insectOptions);

        // create an insect based on the genotype
        const insect = createPhenotype(genotype);
        ```
    For more examples, see the `src/examples` folder

How enome generates `Genomes`:
- Generates a `sequence` of `values` between 0 and 1.
- Groups those `values` into `Genes` by averaging them together
  - This results in the `Genome` being less sensitive to mutation
  - The sensitivity is customizable by varying the `geneLength`, or the number of `values` that go into each `Gene`
  - If you average enough random numbers between 0 and 1 together, you're very statisically likely to get a gene with a value of 0.5, which would mean every genome generated would be dead in the middle of all of the possible combinations. To solve this problem, when a genome is generated, it is generated as if the `geneLength` is 1, then it takes those values and copies them `geneLength` times. For instance, if you had a `geneLength` of 3, you might get something like this: `[0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3]` as your sequence. When these sequence values are averaged together, you get gene values that look like `[0.1, 0.2, 0.3]`, but each value in the sequence is still individually mutable, and only contributes to 1/3 of a gene. 
- Groups those `Genes` into a `Genome`
  - `Genome` exposes a property called `g` that allows you to get the next `Gene` in the `Genome`.
    - This allows you to pass the `Genome` around, consuming its `Genes` as you need them.


# Install instructions
```
npm install enome
```