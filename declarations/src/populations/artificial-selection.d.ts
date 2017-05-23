/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';
import { ArtificialSelectionOptions } from '../options/artificial-selection-options';
import { Observable } from 'rx';
export declare class ArtificialSelection<T extends GenomeOptions, U extends ArtificialSelectionOptions, V> {
    popOptions: U;
    genOptions: T;
    create: (gen: Genome<T>) => V;
    genomes: Genome<T>[];
    private _genomes$;
    readonly genomes$: Observable<Genome<T>[]>;
    constructor(popOptions: U, genOptions: T, create: (gen: Genome<T>) => V);
    readonly current: Genome<T>;
    readonly current$: Observable<Genome<T>>;
    private refresh();
    private add(genome);
    private addRange(genomes);
    private insert(genome, index, delCount);
    private dequeue();
    private requeue();
    private remove(genome);
    private removeAtIndex(index);
    keep(): void;
    kill(): void;
    reproduce(n?: number): void;
    delete(): void;
    random(): void;
    generate(): void;
}
