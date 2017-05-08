/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import { EnomeOptions } from './options';
import { Nucleotide } from './nucleotide';
import { Observable } from "rx";
import 'core-js/shim';
export declare class ReactiveGenome {
    options: EnomeOptions;
    sequence: Observable<number>;
    nucleotides: Observable<Nucleotide>;
    constructor(options: EnomeOptions);
    readonly randomValue: number;
    randomValues(): Observable<number>;
}
