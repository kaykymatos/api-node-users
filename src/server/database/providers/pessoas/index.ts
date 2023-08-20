import * as createPessoa from './CreatePessoas';
import * as updatePessoa from './UpdatePessoas';
import * as getAllPessoa from './GetAllPessoas';
import * as getByIdPessoa from './GetByIdPessoas';
import * as deletePessoa from './DeletePessoas';

export const PessoasProvider = {
  ...createPessoa,
  ...updatePessoa,
  ...getAllPessoa,
  ...getByIdPessoa,
  ...deletePessoa,
};
