import * as getByEmail from './GetByEmail';
import * as createUser from './CreateUsuario';

export const UsuariosProvider = {
  ...getByEmail,
  ...createUser,
};
