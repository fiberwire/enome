
import 'mocha';
import { expect } from 'chai';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { avg } from "operators/mutation/avg";
import { replenish } from "operators/replenish";
import { mocks } from "../../mocks";

describe('operators/mutation', () => {

    let { genome } = mocks();

    beforeEach(() => {
        genome = replenish(genome)
    })

    describe('avg', () => {
        it('should mutate a genome by averaging mutated values with randomly generated values', () => {
            let mutant = avg(genome, 1);

            expect(mutant.sequence.length).to.eql(genome.sequence.length);
            expect(mutant.sequence).not.to.deep.equal(genome.sequence);
        })
    })
})