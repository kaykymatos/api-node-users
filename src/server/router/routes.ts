import { Router } from 'express';
import { EstadosController } from '../controllers/estados';
import { CidadesController } from '../controllers/cidades';
import { PessoasController } from '../controllers/pessoas';

const routes = Router();
//Estados
routes.get('/api/v1/estados/get-all', EstadosController.GetAllEstados);
routes.get(
  '/api/v1/estados/get-by-id/:id',
  EstadosController.GetByIdValidation,
  EstadosController.GetByIdEstados
);
routes.post(
  '/api/v1/estados/create',
  EstadosController.CreateValidation,
  EstadosController.CreateEstados
);
routes.put(
  '/api/v1/estados/update/:id',
  EstadosController.UpdateValidation,
  EstadosController.UpdateEstados
);
routes.delete(
  '/api/v1/estados/delete/:id',
  EstadosController.DeleteValidation,
  EstadosController.DeleteEstados
);

//Cidades
routes.get('/api/v1/cidades/get-all', CidadesController.GetAllCidades);
routes.get(
  '/api/v1/cidades/get-by-id/:id',
  CidadesController.GetByIdValidation,
  CidadesController.GetByIdCidades
);
routes.post(
  '/api/v1/cidades/create',
  CidadesController.CreateValidation,
  CidadesController.CreateCidades
);
routes.put(
  '/api/v1/cidades/update/:id',
  CidadesController.UpdateValidation,
  CidadesController.UpdateCidades
);
routes.delete(
  '/api/v1/cidades/delete/:id',
  CidadesController.DeleteValidation,
  CidadesController.DeleteCidades
);

//Pessoas
routes.get('/api/v1/pessoas/get-all', PessoasController.GetAllPessoas);
routes.get(
  '/api/v1/pessoas/get-by-id/:id',
  PessoasController.GetByIdValidation,
  PessoasController.GetByIdPessoas
);
routes.post(
  '/api/v1/pessoas/create',
  PessoasController.CreateValidation,
  PessoasController.CreatePessoas
);
routes.put(
  '/api/v1/pessoas/update/:id',
  PessoasController.UpdateValidation,
  PessoasController.UpdatePessoas
);
routes.delete(
  '/api/v1/pessoas/delete/:id',
  PessoasController.DeleteValidation,
  PessoasController.DeletePessoas
);

export { routes };
