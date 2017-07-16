import { expect } from "chai";
import "mocha";
import { refresh } from "../../src/operators/refresh";
import { mocks } from "../mocks";

describe("operators", () => {

    let { genome } = mocks();

    describe("replenish", () => {
        it("should return a new genome with replenished genes", () => {
            const n = genome.g;

            expect(genome.genes.length).to.eql(genome.freshGenes.length - 1);

            genome = refresh(genome);

            expect(genome.genes.length).to.eql(genome.freshGenes.length);
        });
    });
});
