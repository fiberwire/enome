import { IGenomeOptions } from '../index';

export interface IPopulationOptions<Gen extends IGenomeOptions> {
  parents: number;
  specimens: number;
  genOptions: Gen;
}
