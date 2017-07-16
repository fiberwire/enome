import { expect } from "chai";
import "mocha";
import { Genome } from "../../../src/genotypes/genome";
import { mutate } from "../../../src/operators/mutation/mutate";
import { refill } from "../../../src/operators/refill";
import { reproduce } from "../../../src/operators/reproduction/reproduce";
import { IGenomeOptions } from "../../../src/options/genome-options";
import { mocks } from "../../mocks";

describe("operators", () => {
    describe("reproduction", () => {
        describe("reproduce", () => {
            let { genome } = mocks();
            const { mutateChance } = mocks();

            beforeEach(() => {
                genome = refill(genome);
            });

            const mutated: Genome<IGenomeOptions> = mutate(genome, mutateChance);
            const offspring: Genome<IGenomeOptions> = reproduce(genome, mutated);

            it("should produce an offspring genome with genetics from both parents", () => {
                expect(mutated.sequence.length).to.eql(genome.sequence.length);
                expect(offspring.sequence.length).to.eql(mutated.sequence.length);

                expect(genome.sequence).to.not.deep.equal(mutated.sequence);
                expect(genome.sequence).to.not.deep.equal(offspring.sequence);
                expect(mutated.sequence).to.not.deep.equal(offspring.sequence);
            });
        });
    });
});
