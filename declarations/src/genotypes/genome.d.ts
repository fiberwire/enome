import { GenomeOptions, Nucleotide } from '../index';
export declare class Genome<T extends GenomeOptions> {
    options: T;
    sequence: number[];
    idLength: number;
    nucleos: Nucleotide[];
    constructor(options: T, sequence?: number[], idLength?: number);
    readonly id: string;
    readonly nucleotides: Nucleotide[];
    readonly nucleo: Nucleotide;
    nuclei(n: number): Nucleotide[];
}
