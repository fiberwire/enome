"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var Nucleotide = (function () {
    function Nucleotide(value) {
        this.value = value;
    }
    Nucleotide.prototype.float = function (min, max, value) {
        if (value === void 0) { value = this.value; }
        return d3.interpolateNumber(min, max)(value);
    };
    Nucleotide.prototype.int = function (min, max, value) {
        if (value === void 0) { value = this.value; }
        return d3.interpolateRound(min, max)(value);
    };
    Nucleotide.prototype.bool = function (value) {
        if (value === void 0) { value = this.value; }
        return this.element([true, false]);
    };
    Nucleotide.prototype.letter = function (value) {
        if (value === void 0) { value = this.value; }
        var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');
        return letters[this.int(0, letters.length - 1)];
    };
    Nucleotide.prototype.element = function (array) {
        return array[this.int(0, array.length - 1)];
    };
    return Nucleotide;
}());
exports.Nucleotide = Nucleotide;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/genotypes/nucleotide.js.map