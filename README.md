# enome
## A Genome generation library

### This library is written in TypeScript, and I recommend using it with a TypeScript project.

What enome does:
- generates a `sequence` (`number[]`) of `values` between `zero` and `one`
- groups those `values` into `Nucleotides` by averaging them together
  - this results in the `Genome` being less sensitive to `mutation`
  - the sensitivity is customizable
- groups those `Nucleotides` into a `Genome`
  - Genome exposes a property called `nucleo` that allows you to get the next `Nucleotide` in the `Genome`.
- accepts an options object, which must implement `EnomeOptions`
  - `EnomeOptions` just has a few essential properties
    - `genomeLength` determines how long the generated sequence will be.
    - `nucleotideLength` determines how many values will average together to form a nucleotide
    - `fitness` is the function that evaluates your genome so you can compare it to other genomes.
    - `idLength` determines how long of a string to generate when generating an id for the genome (using this genome's genetics).
  - You define your min and max hyperparameters in your `Options` object
- makes heavy use of `chance.js`, `d3-interpolate`, and `lodash`.

What enome allows you to do:
 - write code that maps a `Genome` to whatever object you want to build.
 - mutate and evolve that object by mutating and evolving the genome that maps to that object.
 - do it very simply, by providing upper and lower bounds for each variable you want to evolve.


 # Example usage
 say you want to evolve a list of three numbers between 1 and 100 that will add up to 256.


`in list.ts`


`
Coming soon...
`

