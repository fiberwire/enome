# Operators
functions that operate on genomes, genes, or populations.

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

## Note about `Evaluation<T, U>`
Some operators (and all fitness functions) return an `Evaluation<T, U>`.
- `Evaluation<T, U>` is an interface with properties:
    - `fitness`: `number`
    - `genome`: `Genome<T>`
    - `result`: `U`
        - This is the object that is created from your `Genome`.


### <a name="avg-fitness"/></a> avgFitness: number
returns a number representing the average fitness of an array of genomes
- `genomes`: `Genome<T>[]`
    - the array of genomes that you would like to find the average fitness of.
- `fitness`: (`genome`: `Genome<T>`) => `Evaluation<T, U>`
    - a function that determines the `fitness` of a genome.

example usage:
```
let genomes = [
    new Genome(options),
    ...
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
    - a function that determines the `fitness` of a `Genome`.

example usage:
```
let genomes = [
    new Genome(options),
    ...
]

let fitness = (genome: Genome<T>): Evaluation<T,U> => {
    //determine the fitness of your genome by creating an object from it and testing it.
}

let b = best(genomes, fitness).fitness;
// b => 0.7655
```

### <a name="bottom"></a> bottom: Evaluation<T, U>[]
returns an array of `Evaluation<T, U>`s of the bottom X percent (specified by `percent` parameter) of an array of `Genome`s, based on `fitness`.
- `genomes`: `Genome<T>[]`
- `fitness`: (`genome`: `Genome<T>`) => `Evaluation<T, U>`
- `percent`: `number`
    - defaults to `0.5` (for 50%)

example usage:
```
let genomes = [
    new Genome(options),
    ...
]

let fitness = (genome: Genome<T>): Evaluation<T,U> => {
    //determine the fitness of your genome by creating an object from it and testing it.
}

let b = bottom(genomes, fitness, 0.5);
// assuming genomes.length == 10
// b => Genome<T>[5]
```

### <a name=""></a> clone: Genome<T>
returns an exact copy of the `Genome` passed to it, including the state of its `nucleos`.
- `genome`: `Genome<T>`
    - the `Genome` you would like to copy.

example usage:
```
let genome = new Genome(options);
let copy = clone(genome);
```

### <a name=""></a> 
### <a name=""></a>
### <a name=""></a>
### <a name=""></a>
### <a name=""></a>
### <a name=""></a>
### <a name=""></a>
### <a name=""></a>