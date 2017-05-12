import 'mocha';
import { expect } from 'chai';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { Evaluation } from "evalutation";

import * as _ from 'lodash';
import { replenish } from "operators/replenish";
import { mocks } from "../../mocks";
import { sampledMutate } from "operators/mutation/sampled-mutate";

describe('operators', () => {
    describe('mutation', () => {
        describe('sampledMutate', () => {

            let { genome, fitness, mutateChance } = mocks()

            beforeEach(() => {
                genome = replenish(genome);
            });

            it('should return the best of a sample of mutated genomes', () => {
                let mutant = sampledMutate(genome, fitness, 5, mutateChance);

                expect(mutant.sequence.length).to.equal(genome.sequence.length);
                expect(mutant.sequence).to.not.deep.equal(genome.sequence);
            })
        })
    })
})