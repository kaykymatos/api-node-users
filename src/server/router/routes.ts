import { Router } from 'express';
import { EstadosController } from '../controllers/estados';
import { CidadesController } from '../controllers/cidades';
import { PessoasController } from '../controllers/pessoas';
import { UsuariosController } from '../controllers/usuario';
import { EnsureAuthenticated } from '../shared/middleware/EnsureAuthenticated';

const routes = Router();
//Estados
routes.get(
  '/api/v1/estados/get-all',
  EnsureAuthenticated,
  EstadosController.GetAllEstados
);
routes.get(
  '/api/v1/estados/get-by-id/:id',
  EnsureAuthenticated,
  EstadosController.GetByIdValidation,
  EstadosController.GetByIdEstados
);
routes.post(
  '/api/v1/estados/create',
  EnsureAuthenticated,
  EstadosController.CreateValidation,
  EstadosController.CreateEstados
);
routes.put(
  '/api/v1/estados/update/:id',
  EnsureAuthenticated,
  EstadosController.UpdateValidation,
  EstadosController.UpdateEstados
);
routes.delete(
  '/api/v1/estados/delete/:id',
  EnsureAuthenticated,
  EstadosController.DeleteValidation,
  EstadosController.DeleteEstados
);

//Cidades
routes.get(
  '/api/v1/cidades/get-all',
  EnsureAuthenticated,
  CidadesController.GetAllCidades
);
routes.get(
  '/api/v1/cidades/get-by-id/:id',
  EnsureAuthenticated,
  CidadesController.GetByIdValidation,
  CidadesController.GetByIdCidades
);
routes.post(
  '/api/v1/cidades/create',
  EnsureAuthenticated,
  CidadesController.CreateValidation,
  CidadesController.CreateCidades
);
routes.put(
  '/api/v1/cidades/update/:id',
  EnsureAuthenticated,
  CidadesController.UpdateValidation,
  CidadesController.UpdateCidades
);
routes.delete(
  '/api/v1/cidades/delete/:id',
  EnsureAuthenticated,
  CidadesController.DeleteValidation,
  CidadesController.DeleteCidades
);

//Pessoas
routes.get(
  '/api/v1/pessoas/get-all',
  EnsureAuthenticated,
  PessoasController.GetAllPessoas
);
routes.get(
  '/api/v1/pessoas/get-by-id/:id',
  EnsureAuthenticated,
  PessoasController.GetByIdValidation,
  PessoasController.GetByIdPessoas
);
routes.post(
  '/api/v1/pessoas/create',
  EnsureAuthenticated,
  PessoasController.CreateValidation,
  PessoasController.CreatePessoas
);
routes.put(
  '/api/v1/pessoas/update/:id',
  EnsureAuthenticated,
  PessoasController.UpdateValidation,
  PessoasController.UpdatePessoas
);
routes.delete(
  '/api/v1/pessoas/delete/:id',
  EnsureAuthenticated,
  PessoasController.DeleteValidation,
  PessoasController.DeletePessoas
);

//Usuarios

routes.post(
  '/api/v1/usuarios/signin',
  UsuariosController.CreateValidation,
  UsuariosController.Signin
);

routes.post(
  '/api/v1/usuarios/signup',
  UsuariosController.CreateValidation,
  UsuariosController.SignUp
);

export { routes };

