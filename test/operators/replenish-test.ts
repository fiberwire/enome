import { expect } from "chai";
import "mocha";
import { replenish } from "../../src/operators/replenish";
import { mocks } from "../mocks";

describe("operators", () => {

    let { genome } = mocks();

    describe("replenish", () => {
        it("should return a new genome with replenished genes", () => {
            const n = genome.g;

            expect(genome.genes.length).to.eql(genome.freshGenes.length - 1);

            genome = replenish(genome);

            expect(genome.genes.length).to.eql(genome.freshGenes.length);
        });
    });
});
