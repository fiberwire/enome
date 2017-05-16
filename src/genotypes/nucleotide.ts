import * as d3 from 'd3-interpolate';
import * as Chance from 'chance';

const chance = new Chance();

export class Nucleotide {
    constructor(public value: number) {
    }


    //returns a float, interpolated based on this.value
    float(min: number, max: number, value: number = this.value): number {
        return d3.interpolateNumber(min, max)(value);
    }

    //returns an integer, interpolated based on this.value
    int(min: number, max: number, value: number = this.value): number {
        return d3.interpolateRound(min, max)(value);
    }

    //returns a natural number, interpolated based on this.value
    natural(min: number, max: number, value: number = this.value): number {
        return Math.max(0, this.int(min, max, value));
    }

    //returns a boolean, interpolated based on this.value
    bool(value: number = this.value): boolean {
        return this.element([true, false], value);
    }

    //returns an upper or lower case letter, interpolated based on this.value
    letter(value: number = this.value): string {
        let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');
        return this.element(letters, value);
    }

    //returns a lower case letter, interpolated based on this.value
    letterLower(value: number = this.value): string {
        let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        return this.element(letters, value);
    }

    //returns an upper case letter, interpolated based on this.value
    letterUpper(value: number = this.value): string {
        let letters = 'ABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');
        return this.element(letters, value);
    }

    //returns a character, interpolated based on this.value
    char(value: number = this.value): string {
        let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'.split('');
        return this.element(chars, value);
    }

    //returns an element of the given array, interpolated based on this.value;
    element<T>(array: T[], value: number = this.value): T {
        return array[this.int(0, array.length - 1, value)];
    }

    //returns a number of elements of the given array, the number of elements is interpolated based on this.value
    elements<T>(array: T[], value: number = this.value): T[] {
        return array.slice(0, this.int(0, array.length, value));
    }

    //returns a number of randomly selected elements of the given array, the number of elements is interpolated based on this.value
    randomElements<T>(array: T[], value: number = this.value): T[] {
        return chance.shuffle(array).slice(0, this.int(0, array.length, value));
    }
}
