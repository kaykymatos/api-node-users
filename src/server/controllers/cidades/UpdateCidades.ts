import { Request, Response } from 'express';
import { EstadosProvider } from '../../database/providers/estados';
import { StatusCodes } from 'http-status-codes';
import { IEstado } from '../../database/models/Estado';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ICidade } from '../../database/models/Cidade';
import { CidadesProvider } from '../../database/providers/cidades';

interface IParamProps {
  id?: number;
}
interface IBodyProps extends Omit<ICidade, 'id'> {}

export const UpdateValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().optional().moreThan(0),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      estadoId: yup.number().required().integer().moreThan(0),
    })
  ),
}));

export const UpdateCidades = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parametro "Id" precisa ser maior que 0!',
      },
    });
  }
  const result = await CidadesProvider.UpdateCidades(req.params.id, req.body);
  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        default: result.message,
      },
    });
  return res.status(StatusCodes.OK).json(result);
};
