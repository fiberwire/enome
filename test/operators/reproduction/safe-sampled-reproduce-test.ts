import { expect } from "chai";
import "mocha";
import { Genome } from "../../../src/genotypes/genome";
import { best } from "../../../src/operators/best";
import { mutate } from "../../../src/operators/mutation/mutate";
import { replenish } from "../../../src/operators/replenish";
import { safeSampledReproduce } from "../../../src/operators/reproduction/safe-sampled-reproduce";
import { IGenomeOptions } from "../../../src/options/genome-options";
import { mocks } from "../../mocks";

describe("operators", () => {
    describe("reproduction", () => {
        describe("safeSampledReproduce", () => {
            let { genome, mutateChance } = mocks();
            const { nsFitness } = mocks();

            beforeEach(() => {
                genome = replenish(genome);
            });

            const mutant: Genome<IGenomeOptions> = mutate(genome, mutateChance);
            const offspring: Genome<IGenomeOptions> = safeSampledReproduce(
                genome, mutant, nsFitness, mutateChance = mutateChance,
            );

            it("should produce an offspring genome with genetics from both parents, selected from a sample", () => {
                expect(mutant.sequence.length).to.eql(genome.sequence.length);
                expect(offspring.sequence.length).to.eql(mutant.sequence.length);
            });

            it("returns the offspring if it is better than both parents, otherwise returns the best parent", () => {
                if (nsFitness(offspring).fitness > best([genome, mutant], nsFitness).fitness) {
                    expect(offspring.sequence).to.not.deep.equal(genome.sequence);
                    expect(offspring.sequence).to.not.deep.equal(mutant.sequence);
                } else {
                    expect(offspring.sequence).to.deep.equal(best([genome, mutant], nsFitness).genome.sequence);
                }
            });
        });
    });
});
