# Genotypes
classes used in the evolution process

## Table of Contents
 - [Genome](#genome)
    - [constructor](#genome-constructor)
    - [options](#genome-options)
    - [sequence](#genome-sequence)
    - [idLength](#genome-idLength)
    - [id](#genome-id)
    - [nucleotides](#genome-nucleotides)
    - [nucleos](#genome-nucleos)
    - [nuclei](#genome-nuclei)
 - [Nucleotide](#nucleotide)
    - [constructor](#nucleotide-constructor)
    - [float](#nucleotide-float)
    - [int](#nucleotide-int)
    - [natural](#nucleotide-natural)
    - [bool](#nucleotide-bool)
    - [letter](#nucleotide-letter)
    - [letterLower](#nucleotide-letterLower)
    - [letterUpper](#nucleotide-letterUpper)
    - [char](#nucleotide-char)
    - [element](#nucleotide-element)
    - [elements](#nucleotide-elements)
    - [randomElements](#nucleotide-randomElements)


### Genome
The smallest evolvable unit. Contains `Nucleotide`s. Can be evolved by a `Population`.

#### <a name="genome-constructor"></a> constructor()
- `options`: `T`
    - options for setting up a `Genome`.
- `sequence`: `number[]?`
    - values that the `Genome` uses to construct `Nucleotide`s.
- `idLength`: `number?`
    - determines how long the generated `id` will be.

#### <a name="genome-options"></a> options: T
Options for setting up your `Genome`. `GenomeOptions` has properties:
 - `genomeLength`: `number`
   - determines how many `Nucleotide`s the `Genome` will contain
 - `nucleotideLength`: `number`
    - determines how many values from `sequence` each `Nucleotide` will be derived from.
 - `extendNucleotides`: `boolean`
    - If set to `true`, the `Genome` will `replenish` its `Nucleotides` when it runs out.
    - If set to `false`, the `Genome` will throw an error if you consume more `Nucleotides` from it than it contains.

example usage:
```
let options: GenomeOptions = {
    genomeLength: 10,
    nucleotideLength: 1,
    extendNucleotides: false
}

let genome = new Genome(options);
```

#### <a name="genome-sequence"></a> sequence: number[]
An array of numbers between `0` and `1` that is used to construct `nucleotides`. This is randomly generated if you create a new `Genome` without passing a `sequence` to the constructor.

To initialize a genome from a sequence:
```
let sequence = [0.1, 0.2, 0.3, 0.4, 0.5]

let genome = new Genome(options, sequence);
```

#### <a name="genome-idLength"></a> idLength: number
Determines how long the `id` that is generated using the `Genome`'s `nucleotides` will be (does not consume them from `nucleos`).

#### <a name="genome-id"></a> get id(): string
returns a `string` that is (or should be) unique to each `Genome`, because it is derived from the `Genome`'s `nucleotides`. Length of `id` is determined by `idLength`.

#### <a name="genome-nucleotides"></a> get nucleotides(): Nucleotide[]
returns an array of `Nucleotides`. `Nucleotide`s are derived by averaging together values from `sequence`.

example usage:
```
// this will parse genome's sequence, derive Nucleotides from it, and assign it to nucleos.
let nucleos = genome.nucleotides;
```

#### <a name="genome-nucleo"></a> get nucleo(): Nucleotide
returns the next `Nucleotide` in `nucleos`. This is how you are meant to get `Nucleotide`s from the `Genome`.

example usage:
```
//if the next nucleo's value is 0.5, this will print 5.
console.log(genome.nucleo.int(1, 10));
```

#### <a name="genome-nuclei"></a> nuclei(n: number): Nucleotide[]
returns the next `n` `Nucleotide`s in `nucleos`. This is just a convenient way to get multiple `nucleo`s at a time.

example usage:
```
// will create a number[] with integers between 1 and 10
let ns: Nucleotide[] = genome.nuclei(5);
let ints: number[] = ns.map(n => n.int(1, 10));
```

### Nucleotide
Contains a `value`. Can interpolate that `value` in various ways.

#### <a name="nucleotide-constructor"></a> constructor()
- `value`: `number`
    - the value that the `Nucleotide` uses to interpolate.
    - This is the default value for the `value` parameter for all of the methods in this class.
        - There should be almost no reason to have to pass in a value to any of `Nucleotide`'s methods, unless you just want to use them as interpolation functions unrelated to the `Nucleotide` itself.

#### <a name="nucleotide-float"></a> float(min: number, max: number, value: number?): number
returns a floating point number between `min` (inclusive) and `max` (inclusive).
- min: number
    - the minimum value for the interpolated float.
- max: number
    - the maximum value for the interpolated float.
- value: number?
    - the value used to interpolate between `min` and `max`
    - defaults to the `Nucleotide`'s `value`.

usage example:
```
let float = genome.nucleo.float(1, 10);
// float => 5.56789
```

#### <a name="nucleotide-int"></a> int(min: number, max: number, value: number?) : number
returns an integer number between `min` (inclusive) and `max` (inclusive).
- the minimum value for the interpolated float.
- max: number
    - the maximum value for the interpolated float.
- value: number?
    - the value used to interpolate between `min` and `max`
    - defaults to the `Nucleotide`'s `value`.

usage example:
```
let int = genome.nucleo.int(1, 10);
// int => 5
```

#### <a name="nucleotide-natural"></a> natural(min: number, max: number, value: number?): number
returns a positive (>= 0) integer number between `min` (inclusive) and `max` (inclusive).
- the minimum value for the interpolated float.
- max: number
    - the maximum value for the interpolated float.
- value: number?
    - the value used to interpolate between `min` and `max`
    - defaults to the `Nucleotide`'s `value`.

usage example:
```
let natural = genome.nucleo.natural(-100, 10);
// natural => 0
```

#### <a name="nucleotide-bool"></a> bool(value: number?): boolean
returns either `true` or `false`.
- value: number?
    - the value used to interpolate between `min` and `max`
    - defaults to the `Nucleotide`'s `value`.

usage example:
```
let bool = genome.nucleo.bool();
// bool => true
```

#### <a name="nucleotide-letter"></a> letter(value: number?): string
returns an uppercase or lowercase letter.
- value: number?
    - the value used to interpolate between `min` and `max`
    - defaults to the `Nucleotide`'s `value`.

usage example:
```
let letter = genome.nucleo.letter();
// letter => 'A'
```

#### <a name="nucleotide-letterLower"></a> letterLower(value: number?): string
returns a lowercase letter.
- value: number?
    - the value used to interpolate between `min` and `max`
    - defaults to the `Nucleotide`'s `value`.

usage example:
```
let lower = genome.nucleo.letterLower();
// lower => 'g'
```

#### <a name="nucleotide-letterUpper"></a> letterUpper(value: number?): string
returns an uppercase letter.
- value: number?
    - the value used to interpolate between `min` and `max`
    - defaults to the `Nucleotide`'s `value`.

usage example:
```
let upper = genome.nucleo.upper();
// upper => 'S'
```

#### <a name="nucleotide-char"></a> char(value: number?): string
returns an uppercase letter, a lowercase letter, a number (0-9), or a symbol.
- value: number?
    - the value used to interpolate between `min` and `max`
    - defaults to the `Nucleotide`'s `value`.

usage example:
```
let char = genome.nucleo.char();
// char => '@'
```

#### <a name="nucleotide-element"></a> element<T>(array: T[], value: number?): T
returns an element of `array`, interpolated by index.
- array: T[]
    - a generic array. T could be anything.
- value: number?
    - the value used to interpolate between `min` and `max`
    - defaults to the `Nucleotide`'s `value`.

usage example:
```
let array = [1, 2, 3, 4, 5];
let element = genome.nucleo.element(array);
// element => 4
```

#### <a name="nucleotide-elements"></a> elements<T>(array: T[], value: number?): T
returns a number of elements of `array`. The number of elements returned is interpolated. Always starts from the beginning of `array`.
- array: T[]
    - a generic array. T could be anything.
- value: number?
    - the value used to interpolate between `min` and `max`
    - defaults to the `Nucleotide`'s `value`.

usage example:
```
let array = [1, 2, 3, 4, 5];
let element = genome.nucleo.elements(array);
// element => [1, 2, 3]
```

#### <a name="nucleotide-randomElements"></a> randomElements<T>(array: T[], value: number?): T
returns a number of randomly selected elements of `array`. The number of elements returned is interpolated.
- array: T[]
    - a generic array. T could be anything.
- value: number?
    - the value used to interpolate between `min` and `max`
    - defaults to the `Nucleotide`'s `value`.

usage example:
```
let array = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
let element = genome.nucleo.elements(array);
// element => ['e', 'a', 'd', 'g']
```