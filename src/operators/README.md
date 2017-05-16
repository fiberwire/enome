# Operators
functions that operate on genomes, nucleotides, or populations.

## Table of Contents
- [avgFitness](#avg-fitness)
- [best](#best)
- [bottom](#bottom)
- [clone](#clone)
- [concat](#concat)
- [fillRandom](#fill-random)
- [fillWorst](#fill-random)
- [fill](#fill)
- [replenishMany](#replenish-many)
- [replenish](#replenish)
- [top](#top)
- [value](#value)
- [values](#values)
- [worst](#worst)


### <a name="avg-fitness"/></a> avgFitness: number
returns a number representing the average fitness of an array of genomes
- `genomes`: `Genome<T>[]`
    - the array of genomes that you would like to find the average fitness of.
- `fitness`: (`genome`: `Genome<T>`) => `Evaluation<T, U>`
    - a function that determines the `fitness` of a genome.
    - `Evaluation<T, U>` is an interface with properties:
        - fitness: number
        - genome: Genome<T>
        - result: U
            - This is the object that is created from your `Genome`.

example usage:
```
let genomes = [
    new Genome(options),
    new Genome(options),
    new Genome(options),
]

let fitness = (genome: Genome<T>): Evaluation<T,U> => {
    //determine the fitness of your genome by creating an object from it and testing it.
}

let avgFit = avgFitness(genomes, fitness);
// avgFit => 0.5442
```

### <a name="best"></a> best: Evaluation<T, U>
returns an `Evaluation` of the best `Genome` from an array, based on `fitness`.
- `genomes`: `Genome<T>[]`
    - the array of genomes that you would like to find the best `Genome` of.
- `fitness`: (`genome`: `Genome<T>`) => `Evaluation<T, U>`
    - a function that determines the `fitness` of a genome.
    - `Evaluation<T, U>` is an interface with properties:
        - fitness: number
        - genome: Genome<T>
        - result: U
            - This is the object that is created from your `Genome`.

example usage:
```
let genomes = [
    new Genome(options),
    new Genome(options),
    new Genome(options),
]

let fitness = (genome: Genome<T>): Evaluation<T,U> => {
    //determine the fitness of your genome by creating an object from it and testing it.
}

let b = best(genomes, fitness).fitness;
// b => 0.7655
```

### <a name=""></a>
### <a name=""></a>
### <a name=""></a>
### <a name=""></a>
### <a name=""></a>
### <a name=""></a>
### <a name=""></a>
### <a name=""></a>
### <a name=""></a>
### <a name=""></a>