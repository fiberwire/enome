import { Genome } from './genotypes/genome';
import { Nucleotide } from './genotypes/nucleotide';

import { Evaluation } from "./evalutation";
import { GenomeOptions } from "./options/genome-options";
import { best } from "./operators/best";
import { top } from "./operators/top";
import { avg } from "./operators/mutation/avg";
import { sub } from "./operators/mutation/sub";
import { mutate } from "./operators/mutation/mutate";
import { value } from "./operators/value";
import { fill } from "./operators/fill";
import { PopulationOptions } from "./options/population-options";
import { reproduce } from "./operators/reproduction/reproduce";


//options
export {
    GenomeOptions,
    PopulationOptions
};

//genotypes
export {
    Genome,
    Nucleotide
}

//operators
export {
    best,
    top,
    value,
    fill
}

//mutation operators
export {
    avg,
    sub,
    mutate,
}

//reproduction operators
export {
    reproduce
}

//misc
export {
    Evaluation
}
