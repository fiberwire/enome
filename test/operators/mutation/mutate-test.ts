import { expect } from "chai";
import "mocha";
import { Genome, IGenomeOptions, mutate, refresh } from "../../../src/index";
import { mocks } from "../../mocks";

describe("operators", () => {
    describe("mutation", () => {
        describe("mutate", () => {

            let { genome } = mocks();

            beforeEach(() => {
                genome = refresh(genome);
            });

            it("should mutate the genome, given a certain mutation chance (per value in sequence)", () => {
                const mutated: Genome<IGenomeOptions> = mutate(genome, 0.5);
                expect(mutated.sequence).to.not.deep.equal(genome.sequence);
                expect(mutated.sequence.length).to.equal(genome.sequence.length);
            });
        });
    });
});
