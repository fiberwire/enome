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
    natural(max, value = this.value) {
        return d3.interpolateRound(0, max)(value);
    }
    //returns a boolean, interpolated based on this.value
    bool(value = this.value) {
        return this.element([true, false]);
    }
    //returns an upper or lower case letter, interpolated based on this.value
    letter(value = this.value) {
        let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');
        return letters[this.int(0, letters.length - 1)];
    }
    //returns a lower case letter, interpolated based on this.value
    letterLower(value = this.value) {
        let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        return letters[this.int(0, letters.length - 1)];
    }
    //returns an upper case letter, interpolated based on this.value
    letterUpper(value = this.value) {
        let letters = 'ABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');
        return letters[this.int(0, letters.length - 1)];
    }
    //returns a character, interpolated based on this.value
    char(value = this.value) {
        let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'.split('');
        return letters[this.int(0, letters.length - 1)];
    }
    //returns an element of the given array, interpolated based on this.value;
    element(array) {
        return array[this.int(0, array.length - 1)];
    }
    //returns a number of elements of the given array, the number of elements is interpolated based on this.value
    elements(array) {
        return array.slice(0, this.int(0, array.length - 1));
    }
    //returns a number of randomly selected elements of the given array, the number of elements is interpolated based on this.value
    randomElements(array) {
        return chance.shuffle(array).slice(0, this.int(0, array.length - 1));
    }
}
exports.Nucleotide = Nucleotide;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/genotypes/nucleotide.js.map