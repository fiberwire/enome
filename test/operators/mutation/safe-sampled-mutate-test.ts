import { expect } from "chai";
import * as _ from "lodash";
import "mocha";
import { FitnessObjective } from "../../../src/enums/fitness-objective";
import { Genome } from "../../../src/genotypes/genome";
import { safeSampledMutate } from "../../../src/operators/mutation/safe-sampled-mutate";
import { replenish } from "../../../src/operators/replenish";
import { IGenomeOptions } from "../../../src/options/genome-options";
import { mocks } from "../../mocks";

describe("operators", () => {
    describe("mutation", () => {
        describe("safeSampledMutate", () => {

            let { genome } = mocks();
            const { nsFitness, mutateChance } = mocks();

            beforeEach(() => {
                genome = replenish(genome);
            });

            it("returns a mutated genome from a sample if it's better, otherwise,returns the provided genome", () => {
                const mutant: Genome<IGenomeOptions> = safeSampledMutate(
                    genome, nsFitness, FitnessObjective.maximize, 5, mutateChance,
                );

                expect(mutant.sequence.length).to.equal(genome.sequence.length);
                expect(nsFitness(mutant).fitness).to.be.at.least(nsFitness(genome).fitness);

                if (nsFitness(mutant).fitness > nsFitness(genome).fitness) {
                    expect(mutant.sequence).not.to.deep.equal(genome.sequence);
                } else {
                    expect(mutant.sequence).to.deep.equal(genome.sequence);
                }
            });
        });
    });
});
