import { Nucleotide } from './nucleotide';
import { EnomeOptions } from "./options";
export declare class Genome<T extends EnomeOptions> {
    options: T;
    sequence: number[];
    idLength: number;
    nucleos: Nucleotide[];
    constructor(options: T, sequence?: number[], idLength?: number);
    readonly id: string;
    readonly nucleotides: Nucleotide[];
    readonly nucleo: Nucleotide;
    randomValues(n: any): number[];
    readonly value: number;
    sub(gen: Genome<T>, mutateChance: number): Genome<T>;
    avg(gen: Genome<T>, mutateChance: number): Genome<T>;
    mutate(mutateChance: number, type?: string): Genome<T>;
    reproduce(other: Genome<T>, w1?: number, w2?: number, mutateChance?: number): Genome<T>;
    reproduceManyToOne(genomes: Genome<T>[], weights: number[]): Genome<T>;
}
