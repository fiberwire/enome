# enome 
## [![Build Status](https://travis-ci.org/fiberwire/enome.svg?branch=master)](https://travis-ci.org/fiberwire/enome)
## A Genome generation library

### This library is written in TypeScript, and I recommend using it with a TypeScript project.

What enome does:
- generates a `sequence` of `values` between `zero` and `one`
- groups those `values` into `Nucleotides` by averaging them together
  - this results in the `Genome` being less sensitive to `mutation`
  - the sensitivity is customizable by varying the number of `values` that go into each `Nucleotide`
- groups those `Nucleotides` into a `Genome`
  - `Genome` exposes a property called `nucleo` that allows you to get the next `Nucleotide` in the `Genome`.
    - This allows you to pass the `genome` around, consuming its `nucleotides` as you need them.
- accepts an `options` object, which must implement `GenomeOptions`
  - `GenomeOptions` just has a few essential properties
    - `genomeLength` determines how long the generated sequence will be.
    - `nucleotideLength` determines how many values will average together to form a nucleotide
  - You define your min and max hyperparameters in your `options` object
- makes heavy use of `chance.js`, `d3-interpolate`, and `lodash`.

What enome allows you to do:
 - write code that maps a `Genome` to whatever `object` you want to build.
 - `mutate` and `evolve` that object by mutating and evolving the `genome` that maps to that object.
 - do it very simply, by providing upper and lower bounds for each variable you want to evolve.


 # Example usage
 say you want to evolve a list of three numbers between 1 and 100 that will add up to 256.


`in list.ts`


`
Coming soon...
`

