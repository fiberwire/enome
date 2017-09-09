import { lerp } from '../../src/index';

describe('operators', () => {
    describe('lerp', () => {
        it('should linear interpolate between two values', () => {
            const a = 0;
            const b = 10;
            const t = 0.5;

            const c = lerp(a, b, t);

            expect(c).toEqual(5);
        })
    })
})