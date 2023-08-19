import * as createEstado from './CreateEstados';
import * as updateEstado from './UpdateEstados';
import * as getAllEstado from './GetAllEstados';
import * as getByIdEstado from './GetByIdEstados';
import * as deleteEstado from './DeleteEstados';

export const EstadosController = {
  ...createEstado,
  ...updateEstado,
  ...getAllEstado,
  ...getByIdEstado,
  ...deleteEstado,
};

