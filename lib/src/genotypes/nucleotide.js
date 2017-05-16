"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3 = require("d3-interpolate");
const Chance = require("chance");
const chance = new Chance();
class Nucleotide {
    constructor(value) {
        this.value = value;
    }
    //returns a float, interpolated based on this.value
    float(min, max, value = this.value) {
        return d3.interpolateNumber(min, max)(value);
    }
    //returns an integer, interpolated based on this.value
    int(min, max, value = this.value) {
        return d3.interpolateRound(min, max)(value);
    }
    //returns a natural number, interpolated based on this.value
    natural(min, max, value = this.value) {
        return Math.max(0, this.int(min, max, value));
    }
    //returns a boolean, interpolated based on this.value
    bool(value = this.value) {
        return this.element([true, false], value);
    }
    //returns an upper or lower case letter, interpolated based on this.value
    letter(value = this.value) {
        let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');
        return this.element(letters, value);
    }
    //returns a lower case letter, interpolated based on this.value
    letterLower(value = this.value) {
        let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        return this.element(letters, value);
    }
    //returns an upper case letter, interpolated based on this.value
    letterUpper(value = this.value) {
        let letters = 'ABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');
        return this.element(letters, value);
    }
    //returns a character, interpolated based on this.value
    char(value = this.value) {
        let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'.split('');
        return this.element(chars, value);
    }
    //returns an element of the given array, interpolated based on this.value;
    element(array, value = this.value) {
        return array[this.int(0, array.length - 1, value)];
    }
    //returns a number of elements of the given array, the number of elements is interpolated based on this.value
    elements(array, value = this.value) {
        return array.slice(0, this.int(0, array.length, value));
    }
    //returns a number of randomly selected elements of the given array, the number of elements is interpolated based on this.value
    randomElements(array, value = this.value) {
        return chance.shuffle(array).slice(0, this.int(0, array.length, value));
    }
}
exports.Nucleotide = Nucleotide;
//# sourceMappingURL=nucleotide.js.map