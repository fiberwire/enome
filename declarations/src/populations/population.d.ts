/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import { Observable } from 'rx';
import { Evaluation, Genome, GenomeOptions, PopulationOptions } from '../index';
export declare class Population<T extends GenomeOptions, U extends PopulationOptions, V> {
    popOptions: U;
    genOptions: T;
    create: (gen: Genome<T>) => V;
    fitness: (gen: Genome<T>) => Evaluation<T, V>;
    genomes: Genome<T>[];
    constructor(popOptions: U, genOptions: T, create: (gen: Genome<T>) => V, fitness: (gen: Genome<T>) => Evaluation<T, V>);
    reproduce(gens: Genome<T>[]): Genome<T>[];
    mutate(gens: Genome<T>[]): Genome<T>[];
    fill(gens: Genome<T>[]): Genome<T>[];
    evolveStep(): Genome<T>[];
    evolve(generations: number): Evaluation<T, V>;
    evolve$(generations?: number, timeout?: number): Observable<Evaluation<T, V>>;
}
