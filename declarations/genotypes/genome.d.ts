import { Nucleotide } from './nucleotide';
import { EnomeOptions } from "./options";
export declare class Genome {
    options: EnomeOptions;
    sequence: number[];
    idLength: number;
    nucleos: Nucleotide[];
    constructor(options: EnomeOptions, sequence?: number[], idLength?: number);
    readonly id: string;
    readonly nucleotides: Nucleotide[];
    readonly nucleo: Nucleotide;
    randomValues(n: any): number[];
    readonly value: number;
    sub(gen: Genome, mutateChance: number): Genome;
    avg(gen: Genome, mutateChance: number): Genome;
    mutate(mutateChance: number, type?: string): Genome;
    reproduce(other: Genome, w1?: number, w2?: number): Genome;
    static reproduceManyToOne(genomes: Genome[], weights: number[]): Genome;
}
