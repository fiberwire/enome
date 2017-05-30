import { expect } from "chai";
import { Gene } from "genotypes/gene";
import * as _ from "lodash";
import "mocha";
import { bottom } from "../../src/operators/bottom";
import { replenish } from "../../src/operators/replenish";
import { mocks } from "../mocks";

describe("operators", () => {
    describe("bottom", () => {

        let { genomes } = mocks();
        const { nsFitness } = mocks();

        beforeEach(() => {
            genomes = genomes.map(replenish);
        });

        it("should return the worst genomes from the provided array, according to provided fitness function", () => {

            // bottom 50% of genomes
            const b = bottom(genomes, nsFitness, 0.5);

            expect(b.length).to.eql(genomes.length * 0.5);

            // top 50% of genomes
            const sorted = _.sortBy(genomes.map(nsFitness), (e) => e.fitness).reverse();
            const t = new Gene(0.5).elements(sorted);

            expect(t.length).to.eql(genomes.length * 0.5);

            const botAvgFitness = _.meanBy(b, (e) => e.fitness);
            const topAvgFitness = _.meanBy(t, (e) => e.fitness);

            // top is better on average than bottom
            expect(botAvgFitness).to.be.at.most(topAvgFitness);

        });
    });
});
