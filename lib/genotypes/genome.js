"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Chance = require("chance");
var _ = require("lodash");
var nucleotide_1 = require("./nucleotide");
var chance = new Chance();
var Genome = (function () {
    function Genome(options, idLength) {
        if (idLength === void 0) { idLength = 12; }
        this.options = options;
        this.idLength = idLength;
        this.options = options;
        this.sequence = this.randomValues(options.genomeLength);
        this.nucleos = this.nucleotides;
    }
    Object.defineProperty(Genome.prototype, "id", {
        get: function () {
            var nucleos = this.nucleotides;
            var letters;
            var numLetters = nucleos.length / this.idLength;
            letters = _
                .chunk(nucleos, numLetters) //group nucleotides
                .map(function (n) {
                return n.reduce(function (p, n) { return new nucleotide_1.Nucleotide((p.value + n.value) / 2); });
            } //average nucleotides)
            )
                .map(function (n) { return n.interpolateLetter(); });
            //return string of letters
            return letters.reduce(function (p, n) { return p + n; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Genome.prototype, "nucleotides", {
        get: function () {
            var nucleos = _
                .chunk(this.sequence, this.options.nucleotideLength)
                .map(function (n) { return _.reduce(n, function (memo, num) { return memo + num; }, 0) / n.length || 1; })
                .map(function (n) { return new nucleotide_1.Nucleotide(n); });
            return nucleos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Genome.prototype, "nucleo", {
        get: function () {
            return this.nucleos.pop();
        },
        enumerable: true,
        configurable: true
    });
    Genome.prototype.randomValues = function (n) {
        var values = [];
        for (var i = 0; i < n; i++) {
            values.unshift(chance.floating({ min: 0, max: 1 }));
        }
        return values;
    };
    return Genome;
}());
exports.Genome = Genome;
;
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/genotypes/genome.js.map