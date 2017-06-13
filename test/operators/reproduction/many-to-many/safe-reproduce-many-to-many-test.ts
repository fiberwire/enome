import { expect } from "chai";
import * as _ from "lodash";
import "mocha";
import { avgFitness } from "../../../../src/operators/avg-fitness";
import { replenish } from "../../../../src/operators/replenish";
import {
    safeReproduceManyToMany,
} from "../../../../src/operators/reproduction/many-to-many/safe-reproduce-many-to-many";
import { mocks } from "../../../mocks";

describe("operators", () => {
    describe("reproduction", () => {
        describe("safeReproduceManyToMany", () => {
            let { genomes } = mocks();
            const { nsFitness } = mocks();

            beforeEach(() => {
                genomes = genomes.map(replenish);
            });

            it("should produce many offspring from many genomes, given a weight array", () => {
                const offspring = safeReproduceManyToMany(genomes, 5, nsFitness);
                const avgFit = avgFitness(genomes, nsFitness);

                expect(offspring.length).to.eql(5);

                offspring.forEach((o) => {
                    expect(o.genes.length).to.eql(genomes[0].options.genomeLength);
                });

            });
        });
    });
});
