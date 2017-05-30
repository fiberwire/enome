import { expect } from "chai";
import { Gene } from "genotypes/gene";
import * as _ from "lodash";
import "mocha";
import { replenish, top } from "../../src/index";
import { mocks } from "../mocks";

describe("operators", () => {
    describe("top", () => {

        let { genomes } = mocks();
        const { nsFitness } = mocks();

        beforeEach(() => {
            genomes = genomes.map(replenish);
        });

        it("should return the best genomes from the provided array, according to provided fitness function", () => {

            // top 50% of genomes
            const t = top(genomes, nsFitness, 0.5);

            expect(t.length).to.eql(genomes.length * 0.5);

            // bottom 50% of genomes
            const sorted = _.sortBy(genomes.map(nsFitness), (e) => e.fitness);
            const b = new Gene(0.5).elements(sorted);

            expect(b.length).to.eql(genomes.length * 0.5);

            const topAvgFitness = _.meanBy(t, (e) => e.fitness);
            const botAvgFitness = _.meanBy(b, (e) => e.fitness);

            // top is better on average than bottom
            expect(topAvgFitness).to.be.at.least(botAvgFitness);

        });
    });
});
