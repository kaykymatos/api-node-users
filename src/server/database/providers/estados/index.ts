import * as createEstado from './CreateEstados';
import * as updateEstado from './UpdateEstados';
import * as getAllEstado from './GetAllEstados';
import * as getByIdEstado from './GetByIdEstado';
import * as deleteEstado from './DeleteEstados';

export const EstadosProvider = {
  ...createEstado,
  ...updateEstado,
  ...getAllEstado,
  ...getByIdEstado,
  ...deleteEstado,
};
