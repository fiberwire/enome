import * as _ from 'lodash';
import { expect } from 'chai';
import { Genome } from '../../../src/genotypes/genome';
import { GenomeOptions } from '../../../src/options/genome-options';
import { mocks } from '../../mocks';
import { replenish } from '../../../src/operators/replenish';
import { safeMutate } from '../../../src/operators/mutation/safe-mutate';
import 'mocha';

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