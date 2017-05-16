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
    - This allows you to pass the `genome` around, consuming its `nucleotides` as you need them.
- Accepts an `options` object, which must implement `GenomeOptions`
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


`in list.ts`


`
Coming soon...
`

