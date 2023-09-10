import { IEstado } from '../../database/models/Estado';
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { EstadosProvider } from '../../database/providers/estados';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends Omit<IEstado, 'id'> {}

export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
      uf: yup.string().required().min(2).max(150),
    })
  ),
}));

export const CreateEstados = async (
  req: Request<{}, {}, IBodyProps, {}, {}>,
  res: Response
) => {
  const result = await EstadosProvider.CreateEstados(req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
