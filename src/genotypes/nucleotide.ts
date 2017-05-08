import * as d3 from 'd3';

export class Nucleotide {
    constructor(public value: number) {
    }


    float(min: number, max: number, value: number = this.value): number {
        return d3.interpolateNumber(min, max)(value);
    }

    int(min: number, max: number, value: number = this.value): number {
        return d3.interpolateRound(min, max)(value);
    }

    bool(value: number = this.value): boolean {
        return this.element([true, false]);
    }

    letter(value: number = this.value): string {
        let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');
        return letters[this.int(0, letters.length - 1)];
    }

    element<T>(array: T[]): T {
        return array[this.int(0, array.length - 1)];
    }
}
