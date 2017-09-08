import { IGenomeOptions } from '../../index';

export interface ISumOptions extends IGenomeOptions {
  length: number;
  min: number;
  max: number;
}
