/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import { ArtificialSelectionOptions, Genome, GenomeOptions } from '../index';
import { Observable } from 'rx';
export declare class ArtificialSelection<T extends GenomeOptions, U extends ArtificialSelectionOptions, V> {
    popOptions: U;
    genOptions: T;
    create: (gen: Genome<T>) => V;
    genomes: Genome<T>[];
    private _genomes$;
    readonly genomes$: Observable<Genome<T>[]>;
    constructor(popOptions: U, genOptions: T, create: (gen: Genome<T>) => V);
    private refresh();
    private _add(genome);
    private _addRange(genomes);
    private _insert(genome, index, delCount);
    private _dequeue();
    private _requeue();
    private _remove(genome);
    private _removeAtIndex(index);
    keep(): void;
    replace(): void;
    reproduce(n?: number): void;
    kill(): void;
    random(): void;
    generate(): void;
}
