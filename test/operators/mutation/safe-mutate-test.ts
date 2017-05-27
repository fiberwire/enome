import { expect } from "chai";
import * as _ from "lodash";
import "mocha";
import { Genome } from "../../../src/genotypes/genome";
import { safeMutate } from "../../../src/operators/mutation/safe-mutate";
import { replenish } from "../../../src/operators/replenish";
import { IGenomeOptions } from "../../../src/options/genome-options";
import { mocks } from "../../mocks";

describe("operators", () => {
    describe("mutation", () => {
        describe("safeMutate", () => {

            let { genome } = mocks();
            const { nsFitness } = mocks();

            beforeEach(() => {
                genome = replenish(genome);
            });

            it("returns a mutated genome if it's better, otherwise, returns the provided genome", () => {
                const mutant: Genome<IGenomeOptions> = safeMutate(genome, nsFitness);

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
