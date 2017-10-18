import {
  IGenomeOptions,
  IPopulationOptions,
  ISelectionOptions,
} from '../../index';

export interface ISumGenOptions extends IGenomeOptions {
  length: number;
  min: number;
  max: number;
  target: number;
}

// tslint:disable-next-line:no-empty-interface
export interface ISumPopOptions
  extends ISelectionOptions<ISumGenOptions, number[]> {}
