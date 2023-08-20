import * as createEstado from './CreateCidades';
import * as updateEstado from './UpdateCidades';
import * as getAllEstado from './GetAllCidades';
import * as getByIdEstado from './GetByIdCidades';
import * as deleteEstado from './DeleteCidades';

export const CidadesController = {
  ...createEstado,
  ...updateEstado,
  ...getAllEstado,
  ...getByIdEstado,
  ...deleteEstado,
};

