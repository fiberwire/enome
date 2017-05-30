import { expect } from "chai";
import * as _ from "lodash";
import "mocha";
import { replenish } from "../../src/operators/replenish";
import { mocks } from "../mocks";

describe("populations", () => {

    let { pooled } = mocks();
    const { asCreate } = mocks();

    beforeEach(() => {
        pooled = mocks().pooled;
    });

    describe("ArtificialPooledSelection", () => {

        it("should generate genomes", () => {
            expect(pooled.genomes.length).to.eql(pooled.popOptions.initSize);
        });

        it("should initialize parent pool", () => {
            expect(pooled.parents.length).to.eql(pooled.popOptions.minParentPoolSize);
        });

        describe("current", () => {
            it("should be the first genome in genomes", () => {
                expect(pooled.current).to.eql(pooled.genomes[0]);
            });
        });

        describe("currentResult", () => {
            it("should be the result of the first genome in genomes", () => {
                expect(pooled.currentResult).to.eql(asCreate(replenish(pooled.current)));
            });
        });

        describe("keep", () => {
            const lg1 = pooled.genomes.length;
            const lp1 = pooled.parents.length;

            const gFirst1 = pooled.genomes[0];
            const pFirst1 = pooled.parents[0];

            const gSecond1 = pooled.genomes[1];
            const pSecond1 = pooled.parents[1];

            const gLast1 = pooled.genomes[pooled.genomes.length - 1];
            const pLast1 = pooled.parents[pooled.parents.length - 1];

            pooled.keep();

            const lg2 = pooled.genomes.length;
            const lp2 = pooled.parents.length;

            const gFirst2 = pooled.genomes[0];
            const pFirst2 = pooled.parents[0];

            const gSecond2 = pooled.genomes[1];
            const pSecond2 = pooled.parents[1];

            const gLast2 = pooled.genomes[pooled.genomes.length - 1];
            const pLast2 = pooled.parents[pooled.parents.length - 1];

            it("genomes should be the same length", () => {
                expect(lg1).to.eql(lg2);
            });

            it("parents should be longer after", () => {
                expect(lp1).to.be.below(lp2);
            });

            expect(pooled.parents.map((p) => p.genome)).to.deep.include(gFirst1);

            it("first genome should not be in genomes", () => {
                expect(pooled.genomes).not.to.deep.include(gFirst1);
            });

            it("second genome should be first", () => {
                expect(gSecond1).to.eql(gFirst2);
            });

            it("parents should age", () => {
                expect(pFirst2.age).to.eql(pFirst1.age + 1);
            });

        });

        describe("kill", () => {
            it("should kill the current genome and add a new offspring to the end", () => {
                const lg1 = pooled.genomes.length;
                const lp1 = pooled.parents.length;

                const gFirst1 = pooled.genomes[0];
                const pFirst1 = pooled.parents[0];

                const gSecond1 = pooled.genomes[1];
                const pSecond1 = pooled.parents[1];

                const gLast1 = pooled.genomes[pooled.genomes.length - 1];
                const pLast1 = pooled.parents[pooled.parents.length - 1];

                pooled.kill();

                const lg2 = pooled.genomes.length;
                const lp2 = pooled.parents.length;

                const gFirst2 = pooled.genomes[0];
                const pFirst2 = pooled.parents[0];

                const gSecond2 = pooled.genomes[1];
                const pSecond2 = pooled.parents[1];

                const gLast2 = pooled.genomes[pooled.genomes.length - 1];
                const pLast2 = pooled.parents[pooled.parents.length - 1];

                it("should delete the first genome", () => {
                    expect(pooled.genomes).to.not.include(gFirst1);
                    expect(pooled.parents).to.not.include(gFirst1);
                });

                it("should add a new offspring to genomes", () => {
                    expect(lg1).to.eql(lg2);
                });
            });
        });

        describe("reproduce", () => {
            it("should add a new offspring to the end", () => {
                const lg1 = pooled.genomes.length;
                const lp1 = pooled.parents.length;

                const gFirst1 = pooled.genomes[0];
                const pFirst1 = pooled.parents[0];

                const gSecond1 = pooled.genomes[1];
                const pSecond1 = pooled.parents[1];

                const gLast1 = pooled.genomes[pooled.genomes.length - 1];
                const pLast1 = pooled.parents[pooled.parents.length - 1];

                pooled.reproduce();

                const lg2 = pooled.genomes.length;
                const lp2 = pooled.parents.length;

                const gFirst2 = pooled.genomes[0];
                const pFirst2 = pooled.parents[0];

                const gSecond2 = pooled.genomes[1];
                const pSecond2 = pooled.parents[1];

                const gLast2 = pooled.genomes[pooled.genomes.length - 1];
                const pLast2 = pooled.parents[pooled.parents.length - 1];

                expect(lg1).to.be.below(lg2);
                expect(gLast1).to.not.eql(gLast2);
            });
        });

        describe("delete", () => {
            it("should remove the current genome", () => {
                const lg1 = pooled.genomes.length;
                const lp1 = pooled.parents.length;

                const gFirst1 = pooled.genomes[0];
                const pFirst1 = pooled.parents[0];

                const gSecond1 = pooled.genomes[1];
                const pSecond1 = pooled.parents[1];

                const gLast1 = pooled.genomes[pooled.genomes.length - 1];
                const pLast1 = pooled.parents[pooled.parents.length - 1];

                pooled.delete();

                const lg2 = pooled.genomes.length;
                const lp2 = pooled.parents.length;

                const gFirst2 = pooled.genomes[0];
                const pFirst2 = pooled.parents[0];

                const gSecond2 = pooled.genomes[1];
                const pSecond2 = pooled.parents[1];

                const gLast2 = pooled.genomes[pooled.genomes.length - 1];
                const pLast2 = pooled.parents[pooled.parents.length - 1];

                if (pooled.genomes.length > pooled.popOptions.minSize) {
                    expect(lg1).to.be.above(lg2);
                } else {
                    expect(lg1).to.eql(lg2);
                }

                expect(gFirst1).to.not.eql(gFirst2);
            });
        });

        describe("random", () => {
            it("should delete the current genome and add a new random genome to the end", () => {
                const lg1 = pooled.genomes.length;
                const lp1 = pooled.parents.length;

                const gFirst1 = pooled.genomes[0];
                const pFirst1 = pooled.parents[0];

                const gSecond1 = pooled.genomes[1];
                const pSecond1 = pooled.parents[1];

                const gLast1 = pooled.genomes[pooled.genomes.length - 1];
                const pLast1 = pooled.parents[pooled.parents.length - 1];

                pooled.random();

                const lg2 = pooled.genomes.length;
                const lp2 = pooled.parents.length;

                const gFirst2 = pooled.genomes[0];
                const pFirst2 = pooled.parents[0];

                const gSecond2 = pooled.genomes[1];
                const pSecond2 = pooled.parents[1];

                const gLast2 = pooled.genomes[pooled.genomes.length - 1];
                const pLast2 = pooled.parents[pooled.parents.length - 1];

                expect(gFirst1).to.not.eql(gFirst2);
                expect(gLast1).to.not.eql(gLast2);

                expect(lg1).to.eql(lg2);
            });
        });

        describe("generate", () => {
            it("should kill the current genome and add a new random genome to the end", () => {
                const lg1 = pooled.genomes.length;
                const lp1 = pooled.parents.length;

                const gFirst1 = pooled.genomes[0];
                const pFirst1 = pooled.parents[0];

                const gSecond1 = pooled.genomes[1];
                const pSecond1 = pooled.parents[1];

                const gLast1 = pooled.genomes[pooled.genomes.length - 1];
                const pLast1 = pooled.parents[pooled.parents.length - 1];

                pooled.generate();

                const lg2 = pooled.genomes.length;
                const lp2 = pooled.parents.length;

                const gFirst2 = pooled.genomes[0];
                const pFirst2 = pooled.parents[0];

                const gSecond2 = pooled.genomes[1];
                const pSecond2 = pooled.parents[1];

                const gLast2 = pooled.genomes[pooled.genomes.length - 1];
                const pLast2 = pooled.parents[pooled.parents.length - 1];
            });
        });
    });
});
