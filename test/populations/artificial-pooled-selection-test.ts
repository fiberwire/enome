import * as _ from 'lodash';
import { expect } from 'chai';
import { mocks } from '../mocks';
import 'mocha';

describe('populations', () => {

    let { pooled } = mocks();

    beforeEach(() => {
        pooled = mocks().pooled;
    })

    describe('pooledPooledSelection', () => {

        it('should generate genomes', () => {
            expect(pooled.genomes.length).to.eql(pooled.popOptions.initSize);
        })

        describe('current', () => {
            it('should be the first genome in genomes', () => {
                expect(pooled.current).to.eql(pooled.genomes[0]);
            })
        })

        describe('current$', () => {
            it('should be an observable of the first genome in genomes', () => {
                pooled.current$
                    .take(3)
                    .subscribe(g => {
                        expect(g).to.eql(pooled.current)
                        pooled.keep();
                    })
            })
        })

        describe('genomes$', () => {
            it('should stay synced with genomes', () => {
                pooled.genomes$
                    .take(3)
                    .subscribe(genomes => {
                        expect(pooled.genomes).to.eql(genomes);
                        pooled.keep();
                    })
            })
        })

        describe('keep', () => {
            it('should add the current genome to parents', () => {
                let lg1 = pooled.genomes.length;
                let lp1 = pooled.parents.length;

                let gFirst1 = pooled.genomes[0];
                let pFirst1 = pooled.parents[0];

                let gSecond1 = pooled.genomes[1];
                let pSecond1 = pooled.parents[1];

                let gLast1 = pooled.genomes[pooled.genomes.length - 1];
                let pLast1 = pooled.parents[pooled.parents.length - 1];

                pooled.keep();

                let lg2 = pooled.genomes.length;
                let lp2 = pooled.parents.length;

                let gFirst2 = pooled.genomes[0];
                let pFirst2 = pooled.parents[0];

                let gSecond2 = pooled.genomes[1];
                let pSecond2 = pooled.parents[1];

                let gLast2 = pooled.genomes[pooled.genomes.length - 1];
                let pLast2 = pooled.parents[pooled.parents.length - 1];

                it('genomes should be the same length', () => {
                    expect(lg1).to.eql(lg2);
                })

                it('parents should be longer after', () => {
                    expect(lp1).to.be.below(lp2);
                })

                it('first genome should be in parents', () => {
                    expect(pooled.parents).to.include(gFirst1);
                })

                it('first genome should not be in genomes', () => {
                    expect(pooled.parents).not.to.include(gFirst1);
                })

                it('second genome should be first', () => {
                    expect(gSecond1).to.eql(gFirst2);
                })

            })
        })

        describe('kill', () => {
            it('should kill the current genome and add a new offspring to the end', () => {
                let lg1 = pooled.genomes.length;
                let lp1 = pooled.parents.length;

                let gFirst1 = pooled.genomes[0];
                let pFirst1 = pooled.parents[0];

                let gSecond1 = pooled.genomes[1];
                let pSecond1 = pooled.parents[1];

                let gLast1 = pooled.genomes[pooled.genomes.length - 1];
                let pLast1 = pooled.parents[pooled.parents.length - 1];

                pooled.kill();

                let lg2 = pooled.genomes.length;
                let lp2 = pooled.parents.length;

                let gFirst2 = pooled.genomes[0];
                let pFirst2 = pooled.parents[0];

                let gSecond2 = pooled.genomes[1];
                let pSecond2 = pooled.parents[1];

                let gLast2 = pooled.genomes[pooled.genomes.length - 1];
                let pLast2 = pooled.parents[pooled.parents.length - 1];

                it('should delete the first genome', () => {
                    expect(pooled.genomes).to.not.include(gFirst1);
                    expect(pooled.parents).to.not.include(gFirst1);
                })

                it('should add a new offspring to genomes', () => {
                    expect(lg1).to.eql(lg2);
                })
            })
        })

        describe('reproduce', () => {
            it('should add a new offspring to the end', () => {
                let lg1 = pooled.genomes.length;
                let lp1 = pooled.parents.length;

                let gFirst1 = pooled.genomes[0];
                let pFirst1 = pooled.parents[0];

                let gSecond1 = pooled.genomes[1];
                let pSecond1 = pooled.parents[1];

                let gLast1 = pooled.genomes[pooled.genomes.length - 1];
                let pLast1 = pooled.parents[pooled.parents.length - 1];

                pooled.reproduce();

                let lg2 = pooled.genomes.length;
                let lp2 = pooled.parents.length;

                let gFirst2 = pooled.genomes[0];
                let pFirst2 = pooled.parents[0];

                let gSecond2 = pooled.genomes[1];
                let pSecond2 = pooled.parents[1];

                let gLast2 = pooled.genomes[pooled.genomes.length - 1];
                let pLast2 = pooled.parents[pooled.parents.length - 1];

                expect(lg1).to.be.below(lg2);
                expect(gLast1).to.not.eql(gLast2);
            })
        })

        describe('delete', () => {
            it('should remove the current genome', () => {
                let lg1 = pooled.genomes.length;
                let lp1 = pooled.parents.length;

                let gFirst1 = pooled.genomes[0];
                let pFirst1 = pooled.parents[0];

                let gSecond1 = pooled.genomes[1];
                let pSecond1 = pooled.parents[1];

                let gLast1 = pooled.genomes[pooled.genomes.length - 1];
                let pLast1 = pooled.parents[pooled.parents.length - 1];

                pooled.delete();

                let lg2 = pooled.genomes.length;
                let lp2 = pooled.parents.length;

                let gFirst2 = pooled.genomes[0];
                let pFirst2 = pooled.parents[0];

                let gSecond2 = pooled.genomes[1];
                let pSecond2 = pooled.parents[1];

                let gLast2 = pooled.genomes[pooled.genomes.length - 1];
                let pLast2 = pooled.parents[pooled.parents.length - 1];

                
                if (pooled.genomes.length > pooled.popOptions.minSize){
                    expect(lg1).to.be.above(lg2);
                }
                else{
                    expect(lg1).to.eql(lg2);
                }

                expect(gFirst1).to.not.eql(gFirst2);
            })
        })

        describe('random', () => {
            it('should delete the current genome and add a new random genome to the end', () => {
                let lg1 = pooled.genomes.length;
                let lp1 = pooled.parents.length;

                let gFirst1 = pooled.genomes[0];
                let pFirst1 = pooled.parents[0];

                let gSecond1 = pooled.genomes[1];
                let pSecond1 = pooled.parents[1];

                let gLast1 = pooled.genomes[pooled.genomes.length - 1];
                let pLast1 = pooled.parents[pooled.parents.length - 1];

                pooled.random();

                let lg2 = pooled.genomes.length;
                let lp2 = pooled.parents.length;

                let gFirst2 = pooled.genomes[0];
                let pFirst2 = pooled.parents[0];

                let gSecond2 = pooled.genomes[1];
                let pSecond2 = pooled.parents[1];

                let gLast2 = pooled.genomes[pooled.genomes.length - 1];
                let pLast2 = pooled.parents[pooled.parents.length - 1];

                expect(gFirst1).to.not.eql(gFirst2);
                expect(gLast1).to.not.eql(gLast2);
                
                if (pooled.genomes.length > pooled.popOptions.minSize){
                    expect(lg1).to.be.above(lg2);
                }
                else{
                    expect(lg1).to.eql(lg2); 
                }
            })
        })

        describe('generate', () => {
            it('should kill the current genome and add a new random genome to the end', () => {
                let lg1 = pooled.genomes.length;
                let lp1 = pooled.parents.length;

                let gFirst1 = pooled.genomes[0];
                let pFirst1 = pooled.parents[0];

                let gSecond1 = pooled.genomes[1];
                let pSecond1 = pooled.parents[1];

                let gLast1 = pooled.genomes[pooled.genomes.length - 1];
                let pLast1 = pooled.parents[pooled.parents.length - 1];

                pooled.generate();

                let lg2 = pooled.genomes.length;
                let lp2 = pooled.parents.length;

                let gFirst2 = pooled.genomes[0];
                let pFirst2 = pooled.parents[0];

                let gSecond2 = pooled.genomes[1];
                let pSecond2 = pooled.parents[1];

                let gLast2 = pooled.genomes[pooled.genomes.length - 1];
                let pLast2 = pooled.parents[pooled.parents.length - 1];
            })
        })
    })
})