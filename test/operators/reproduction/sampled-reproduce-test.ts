import { expect } from "chai";
import "mocha";
import { Genome } from "../../../src/genotypes/genome";
import { mutate } from "../../../src/operators/mutation/mutate";
import { replenish } from "../../../src/operators/replenish";
import { sampledReproduce } from "../../../src/operators/reproduction/sampled-reproduce";
import { IGenomeOptions } from "../../../src/options/genome-options";
import { mocks } from "../../mocks";

describe("operators", () => {
    describe("reproduction", () => {
        describe("sampledReproduce", () => {
            let { genome } = mocks();
            const { mutateChance, nsFitness } = mocks();

            beforeEach(() => {
                genome = replenish(genome);
            });

            const mutated: Genome<IGenomeOptions> = mutate(genome, mutateChance);
            const offspring: Genome<IGenomeOptions> = sampledReproduce(genome, mutated, nsFitness);

            it("should produce an offspring genome with genetics from both parents, selected from a sample", () => {
                expect(mutated.sequence.length).to.eql(genome.sequence.length);
                expect(offspring.sequence.length).to.eql(mutated.sequence.length);

                expect(genome.sequence).to.not.deep.equal(mutated.sequence);
                expect(genome.sequence).to.not.deep.equal(offspring.sequence);
                expect(mutated.sequence).to.not.deep.equal(offspring.sequence);
            });
        });
    });
});
