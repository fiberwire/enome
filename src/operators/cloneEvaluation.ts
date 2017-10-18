import * as _ from 'lodash';

import { IEvaluation, IGenomeOptions } from '../index';

export function cloneEvaluation<Gen extends IGenomeOptions, Data, Pheno>(
  evaluation: IEvaluation<Gen, Data, Pheno>
): IEvaluation<Gen, Data, Pheno> {
  return _.cloneDeep(evaluation);
}
