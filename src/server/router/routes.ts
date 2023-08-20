import { Router } from 'express';
import { EstadosController } from '../controllers/estados';
import { CidadesController } from '../controllers/cidades';

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


export { routes };
