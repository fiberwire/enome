/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import { ArtificialPooledSelectionOptions } from '../options/artificial-pooled-selection-options';
import { Observable } from 'rx';
import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';
import { Parent } from '../interfaces/parent';
export declare class ArtificialPooledSelection<T extends GenomeOptions, U extends ArtificialPooledSelectionOptions, V> {
    popOptions: U;
    genOptions: T;
    create: (gen: Genome<T>) => V;
    genomes: Genome<T>[];
    parents: Parent<T>[];
    private _genomes$;
    private _parents$;
    readonly genomes$: Observable<Genome<T>[]>;
    readonly parents$: Observable<Parent<T>[]>;
    readonly genomesAndParents$: Observable<[Genome<T>[], Parent<T>[]]>;
    constructor(popOptions: U, genOptions: T, create: (gen: Genome<T>) => V);
    readonly current: Genome<T>;
    readonly current$: Observable<Genome<T>>;
    private refresh();
    private refreshGenomes();
    private refreshParents();
    private add(genome);
    private addParent(genome);
    private addRange(genomes);
    private addParentRange(genomes);
    private insert(genome, index, delCount?);
    private insertParent(genome, index, delCount?);
    private dequeue();
    private dequeueParent();
    private requeue();
    private remove(genome);
    private removeParent(parent);
    private removeAtIndex(index);
    private removeParentAtIndex(index);
    keep(): void;
    kill(): void;
    reproduce(n?: number): void;
    delete(): void;
    random(): void;
    generate(): void;
}
