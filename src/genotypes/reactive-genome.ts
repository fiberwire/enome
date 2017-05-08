import { EnomeOptions } from './options';
import { Nucleotide } from './nucleotide';
import { Subject, Observable, Scheduler } from "rx";
import * as Chance from 'chance';

import 'core-js/shim';

const chance = new Chance();

export class ReactiveGenome {

    sequence: Observable<number>;
    nucleotides: Observable<Nucleotide>;

    constructor(public options: EnomeOptions) {
        this.sequence = this.randomValues().take(options.genomeLength);
        this.nucleotides = this.sequence
            .bufferWithCount(options.nucleotideLength)
            .map((values: number[]) => {
                return values.reduce((x: number, y: number) => (x + y) / 2)
            })
            .map((value: number) => new Nucleotide(value));
    }

    get randomValue() {
        return chance.floating({ min: 0, max: 1 });
    }

    randomValues(): Observable<number> {
        return Observable.generate(
            this.randomValue,
            x => true,
            x => chance.floating({ min: 0, max: 1 }),
            x => x);
    }


}