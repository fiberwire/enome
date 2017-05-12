import 'mocha';
import { expect } from 'chai';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { safeMutate } from "operators/mutation/safe-mutate";
import { Evaluation } from "evalutation";

import * as _ from 'lodash';
import { replenish } from "operators/replenish";
import { mocks } from "../../mocks";

describe('operators', () => {
    describe('mutation', () => {
        describe('safeMutate', () => {

            let { genome, fitness } = mocks()

            beforeEach(() => {
                genome = replenish(genome);
            });

            it('should return a mutated genome if it\'s better than the provided one, otherwise, should return the provided genome', () => {
                let mutant: Genome<GenomeOptions> = safeMutate(genome, fitness);

                expect(mutant.sequence.length).to.equal(genome.sequence.length);
                expect(fitness(mutant).fitness).to.be.at.least(fitness(genome).fitness);

                if (fitness(mutant).fitness > fitness(genome).fitness) {
                    expect(mutant.sequence).not.to.deep.equal(genome.sequence);
                }
                else {
                    expect(mutant.sequence).to.deep.equal(genome.sequence);
                }
            })
        })
    })
})