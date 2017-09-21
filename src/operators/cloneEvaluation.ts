import * as _ from 'lodash';

import {
  IDataEvaluation,
  IGenomeOptions,
  IPopulationOptions,
  Organism,
} from '../index';

export function cloneEvaluation<
  GenType extends IGenomeOptions,
  PopType extends IPopulationOptions,
  DataType,
  PhenoType,
  EnvStateType
>(
  evaluation: IDataEvaluation<GenType, DataType, PhenoType>
): IDataEvaluation<GenType, DataType, PhenoType> {
  return _.cloneDeep(evaluation);
}
