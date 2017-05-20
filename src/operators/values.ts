import * as _ from 'lodash';
import { value } from '../index';

//returns n random values between min and max
export function values(n : number, min: number = 0, max: number = 1) : number[]{
    return _.range(0, n).map(i => value(min, max));
}