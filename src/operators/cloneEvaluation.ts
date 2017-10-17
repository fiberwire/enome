import * as _ from 'lodash';

import {
  IEvaluation,
  IGenomeOptions,
  IPopulationOptions,
} from '../index';

export function cloneEvaluation<
  GenType extends IGenomeOptions,
  PopType extends IPopulationOptions,
  DataType,
  PhenoType,
  EnvStateType
>(
  evaluation: IEvaluation<GenType, DataType, PhenoType>
): IEvaluation<GenType, DataType, PhenoType> {
  return _.cloneDeep(evaluation);
}
