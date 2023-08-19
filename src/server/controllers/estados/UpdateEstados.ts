import { Request, Response } from 'express';
import { EstadosProvider } from '../../database/providers/estados';
import { StatusCodes } from 'http-status-codes';
import { IEstado } from '../../database/models/Estado';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IParamProps {
  id?: number;
}
interface IBodyProps extends Omit<IEstado, 'id'> {}

export const UpdateValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().optional().moreThan(0),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      uf: yup.string().required().length(2),
    })
  ),
}));

export const UpdateEstados = async (
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
  const result = await EstadosProvider.UpdateEstados(req.params.id, req.body);
  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  return res.status(StatusCodes.OK).json();
};
