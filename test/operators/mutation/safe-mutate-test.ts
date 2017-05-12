import 'mocha';
import { expect } from 'chai';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { safeMutate } from "operators/mutation/safe-mutate";
import { Evaluation } from "evalutation";

import * as _ from 'lodash';
import { replenish } from "operators/replenish";

describe('operators/mutation', () => {
    describe('safeMutate', () => {

        let gen: Genome<GenomeOptions>;
        let fitness: (gen: Genome<GenomeOptions>) => Evaluation<GenomeOptions>;
        beforeEach(() => {
            gen = new Genome({
                genomeLength: 10,
                nucleotideLength: 1
            });

            fitness = (g: Genome<GenomeOptions>) => {
                g = replenish(g);
                let ns = g.nuclei(10);
                return {
                    fitness: _.sum(ns),
                    genome: g
                }
            }

        })

        it('should return a mutated genome if it\'s better than the provided one, otherwise, should return the provided genome', () => {
            let mutant: Genome<GenomeOptions> = safeMutate(gen, fitness);

            expect(mutant.sequence.length).to.equal(gen.sequence.length);
            expect(fitness(mutant).fitness).to.be.at.least(fitness(gen).fitness);

            if (fitness(mutant).fitness > fitness(gen).fitness) {
                expect(mutant.sequence).not.to.deep.equal(gen.sequence);
            }
            else {
                expect(mutant.sequence).to.deep.equal(gen.sequence);
            }
        })
    })
})