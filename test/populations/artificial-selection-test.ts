import { expect } from "chai";
import * as _ from "lodash";
import "mocha";
import { mocks } from "../mocks";

describe("populations", () => {

    let { artificial } = mocks();

    beforeEach(() => {
        artificial = mocks().artificial;
    });

    describe("ArtificialSelection", () => {

        it("should generate genomes", () => {
            expect(artificial.genomes.length).to.eql(artificial.popOptions.initSize);
        });

        describe("current", () => {
            it("should be the first genome in genomes", () => {
                expect(artificial.current).to.eql(artificial.genomes[0]);
            });
        });

        describe("current$", () => {
            it("should be an observable of the first genome in genomes", () => {
                artificial.current$
                    .take(3)
                    .subscribe((g) => {
                        expect(g).to.eql(artificial.current);
                        artificial.keep();
                    });
            });
        });

        describe("keep", () => {
            it("should return the current genome to the end", () => {
                const l1 = artificial.genomes.length;
                const first1 = artificial.genomes[0];
                const second1 = artificial.genomes[1];
                const last1 = artificial.genomes[artificial.genomes.length - 1];

                artificial.keep();

                const l2 = artificial.genomes.length;
                const first2 = artificial.genomes[0];
                const last2 = artificial.genomes[artificial.genomes.length - 1];

                expect(first1).to.eql(last2);
                expect(second1).to.eql(first2);
                expect(l1).to.eql(l2);
            });
        });

        describe("replace", () => {
            it("should kill the current genome and add a new offspring to the end", () => {
                const l1 = artificial.genomes.length;
                const first1 = artificial.genomes[0];
                const last1 = artificial.genomes[artificial.genomes.length - 1];

                artificial.kill();

                const l2 = artificial.genomes.length;
                const first2 = artificial.genomes[0];
                const last2 = artificial.genomes[artificial.genomes.length - 1];

                expect(first1).to.not.eql(first2);
                expect(first1).to.not.eql(last2);
                expect(l1).to.eql(l2);
            });
        });

        describe("reproduce", () => {
            it("should add a new offspring to the end", () => {
                const l1 = artificial.genomes.length;
                const first1 = artificial.genomes[0];
                const last1 = artificial.genomes[artificial.genomes.length - 1];

                artificial.reproduce();

                const l2 = artificial.genomes.length;
                const first2 = artificial.genomes[0];
                const last2 = artificial.genomes[artificial.genomes.length - 1];

                expect(first1).to.eql(first2);
                expect(last1).to.not.eql(last2);
                expect(last1).to.eql(artificial.genomes[l2 - 2]);
                expect(l1).to.be.below(l2);
            });
        });

        describe("kill", () => {
            it("should remove the current genome", () => {
                const l1 = artificial.genomes.length;
                const first1 = artificial.genomes[0];
                const last1 = artificial.genomes[artificial.genomes.length - 1];

                artificial.delete();

                const l2 = artificial.genomes.length;
                const first2 = artificial.genomes[0];
                const last2 = artificial.genomes[artificial.genomes.length - 1];

                expect(first1).to.not.eql(first2);
                expect(last1).to.eql(last2);
                expect(l1).to.be.above(l2);
            });
        });

        describe("random", () => {
            it("should kill the current genome and add a new random genome to the end", () => {
                const l1 = artificial.genomes.length;
                const first1 = artificial.genomes[0];
                const last1 = artificial.genomes[artificial.genomes.length - 1];

                artificial.random();

                const l2 = artificial.genomes.length;
                const first2 = artificial.genomes[0];
                const last2 = artificial.genomes[artificial.genomes.length - 1];

                expect(first1).to.not.eql(first2);
                expect(first1).to.not.eql(last2);
                expect(last1).to.eql(artificial.genomes[l2 - 2]);
                expect(l1).to.eql(l2);
            });
        });

        describe("generate", () => {
            it("should kill the current genome and add a new random genome to the end", () => {
                const l1 = artificial.genomes.length;
                const first1 = artificial.genomes[0];
                const last1 = artificial.genomes[artificial.genomes.length - 1];

                artificial.generate();

                const l2 = artificial.genomes.length;
                const first2 = artificial.genomes[0];
                const last2 = artificial.genomes[artificial.genomes.length - 1];

                expect(first1).to.eql(first1);
                expect(last1).to.not.eql(last2);
                expect(last1).to.eql(artificial.genomes[l2 - 2]);
                expect(l1).to.be.below(l2);
            });
        });
    });
});
