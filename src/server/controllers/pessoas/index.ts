import * as createPessoa from './CreateEstados';
import * as updatePessoa from './UpdateEstados';
import * as getAllPessoa from './GetAllEstados';
import * as getByIdPessoa from './GetByIdEstados';
import * as deletePessoa from './DeleteEstados';

export const PessoasController = {
  ...createPessoa,
  ...updatePessoa,
  ...getAllPessoa,
  ...getByIdPessoa,
  ...deletePessoa,
};
