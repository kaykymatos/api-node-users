import { Router } from 'express';
import { EstadosController } from '../controllers/estados';

const routes = Router();

routes.get('/api/v1/estados/get-all', EstadosController.GetAllEstados);
routes.get('/api/v1/estados/get-by-id',EstadosController.GetByIdValidation, EstadosController.GetByIdEstados);
routes.get('/api/v1/estados/create',EstadosController.CreateValidation, EstadosController.CreateEstados);
routes.get('/api/v1/estados/update',EstadosController.UpdateValidation, EstadosController.UpdateEstados);
routes.get('/api/v1/estados/delete',EstadosController.DeleteValidation, EstadosController.DeleteEstados);

export { routes };
