import * as createCidade from './CreateCidades';
import * as updateCidade from './UpdateCidades';
import * as getAllCidade from './GetAllCidades';
import * as getByIdCidade from './GetByIdCidades';
import * as deleteCidade from './DeleteCidades';

export const CidadesProvider = {
  ...createCidade,
  ...updateCidade,
  ...getAllCidade,
  ...getByIdCidade,
  ...deleteCidade,
};
