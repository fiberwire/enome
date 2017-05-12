import 'mocha';
import { expect } from 'chai';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mutate } from "operators/mutation/mutate";
import { Nucleotide } from "genotypes/nucleotide";
import { mocks } from "../../mocks";
import { replenish } from "operators/replenish";
import { safeReproduce } from "operators/reproduction/safe-reproduce";
import { best } from "operators/best";

describe('operators/reproduction', () => {
    describe('safeReproduce', () => {
        let { genome, fitness, mutateChance } = mocks();

        beforeEach(() => {
            genome = replenish(genome);
        })

        it('should produce an offspring genome with genetics from both parents', () => {
            let mutant: Genome<GenomeOptions> = mutate(genome, mutateChance);

            expect(mutant.sequence.length).to.eql(genome.sequence.length);
            expect(mutant.nucleos.length).to.eql(mutant.options.genomeLength);

            let offspring: Genome<GenomeOptions> = safeReproduce(genome, mutant, fitness, mutateChance = mutateChance); //last two parameters are relative weights for each parents chance for their genes to be picked

            expect(offspring.sequence.length).to.eql(mutant.sequence.length);

            if (fitness(offspring).fitness > best([genome, mutant], fitness).fitness) {
                expect(offspring.sequence).to.not.deep.equal(genome.sequence);
                expect(offspring.sequence).to.not.deep.equal(mutant.sequence);
            }
            else {
                expect(offspring.sequence).to.deep.equal(best([genome, mutant], fitness).genome.sequence);
            }
        })
    })
})

