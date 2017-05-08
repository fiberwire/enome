import * as d3 from 'd3';
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
    natural(max: number, value: number = this.value): number {
        return d3.interpolateRound(0, max)(value);
    }

    //returns a boolean, interpolated based on this.value
    bool(value: number = this.value): boolean {
        return this.element([true, false]);
    }

    //returns an upper or lower case letter, interpolated based on this.value
    letter(value: number = this.value): string {
        let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');
        return letters[this.int(0, letters.length - 1)];
    }

    //returns a lower case letter, interpolated based on this.value
    letterLower(value: number = this.value): string {
        let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        return letters[this.int(0, letters.length - 1)];
    }

    //returns an upper case letter, interpolated based on this.value
    letterUpper(value: number = this.value): string {
        let letters = 'ABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');
        return letters[this.int(0, letters.length - 1)];
    }

    //returns a character, interpolated based on this.value
    char(value: number = this.value): string {
        let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'.split('');
        return letters[this.int(0, letters.length - 1)];
    }

    //returns an element of the given array, interpolated based on this.value;
    element<T>(array: T[]): T {
        return array[this.int(0, array.length - 1)];
    }

    //returns a number of elements of the given array, the number of elements is interpolated based on this.value
    elements<T>(array: T[]): T[] {
        return array.slice(0, this.int(0, array.length - 1));
    }

    //returns a number of randomly selected elements of the given array, the number of elements is interpolated based on this.value
    randomElements<T>(array: T[]): T[] {
        return chance.shuffle(array).slice(0, this.int(0, array.length - 1));
    }
}
