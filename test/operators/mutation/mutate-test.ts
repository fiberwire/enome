import { expect } from "chai";
import "mocha";
import { Genome } from "../../../src/genotypes/genome";
import { mutate } from "../../../src/operators/mutation/mutate";
import { replenish } from "../../../src/operators/replenish";
import { IGenomeOptions } from "../../../src/options/genome-options";
import { mocks } from "../../mocks";

describe("operators", () => {
    describe("mutation", () => {
        describe("mutate", () => {

            let { genome } = mocks();

            beforeEach(() => {
                genome = replenish(genome);
            });

            it("should mutate the genome, given a certain mutation chance (per value in sequence)", () => {
                const mutated: Genome<IGenomeOptions> = mutate(genome, 0.5);
                expect(mutated.sequence).to.not.deep.equal(genome.sequence);
                expect(mutated.sequence.length).to.equal(genome.sequence.length);
            });
        });
    });
});
