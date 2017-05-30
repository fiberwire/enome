import { expect } from "chai";
import * as _ from "lodash";
import "mocha";
import { mocks } from "../mocks";

describe("populations", () => {

    let {natural} = mocks();

    beforeEach(() => {
        natural = mocks().natural;
    });

    describe("NaturalSelection", () => {
        it("should generate genomes", () => {
            expect(natural.genomes.length).to.eql(natural.popOptions.populationSize);
        });

        it("should be able to evolve synchronously", () => {
            const gen1 = natural.evolve(1);
            const futureGens = _.range(5).map((i) => natural.evolve(2));

            expect(_.meanBy(futureGens, (g) => g.fitness)).to.be.at.least(gen1.fitness);
        });

        it("should be able to evolve asynchronously", () => {
            const gen1 = natural.evolve(1);
            natural.evolve$(10)
            .skip(5)
            .map((e) => e.fitness)
            .reduce((a, b) => _.mean([a, b]))
            .subscribe((fitness) => {
                expect(fitness).to.be.at.least(gen1.fitness);
            });
        });

    });
});
