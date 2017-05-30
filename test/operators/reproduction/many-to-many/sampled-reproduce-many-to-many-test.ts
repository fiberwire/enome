import { expect } from "chai";
import * as _ from "lodash";
import "mocha";
import { replenish } from "../../../../src/operators/replenish";
import {
    sampledReproduceManyToMany,
} from "../../../../src/operators/reproduction/many-to-many/sampled-reproduce-many-to-many";
import { mocks } from "../../../mocks";

describe("operators", () => {
    describe("reproduction", () => {
        describe("sampledReproduceManyToMany", () => {
            let { genomes } = mocks();
            const { nsFitness } = mocks();

            beforeEach(() => {
                genomes = genomes.map(replenish);
            });

            it("should produce many offspring from many genomes, given a weight array", () => {
                const offspring = sampledReproduceManyToMany(genomes, 5, nsFitness);

                offspring.forEach((o) => {
                    expect(o.genes.length).to.eql(genomes[0].options.genomeLength);
                });

                genomes.forEach((g) => {
                    offspring.forEach((o) => {
                        expect(o.sequence).to.not.deep.equal(g.sequence);
                    });
                });
            });
        });
    });
});
