import { Nucleotide } from './nucleotide';
import { EnomeOptions } from "./options";
export declare class Genome {
    options: EnomeOptions;
    idLength: number;
    sequence: number[];
    nucleos: Nucleotide[];
    constructor(options: EnomeOptions, idLength?: number);
    readonly id: string;
    readonly nucleotides: Nucleotide[];
    readonly nucleo: Nucleotide;
    randomValues(n: any): number[];
}
