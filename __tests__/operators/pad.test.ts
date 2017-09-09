
import { pad } from "../../src/index";

describe('operators', () => {
    describe('pad' , () => {
        it('should return an array of numbers where the numbers are duplicated n times', () => {
            const array = [0.1, 0.2, 0.3];
            const n = 2
            const padded = pad(array, n);

            expect(padded.length).toBe(array.length * n);
            expect(padded).toEqual([0.1, 0.1, 0.2, 0.2, 0.3, 0.3]);
        })
    })
})