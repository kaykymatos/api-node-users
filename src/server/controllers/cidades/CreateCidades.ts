import { Request, Response } from 'express';
import * as yup from 'yup';
import { ICidade } from '../../database/models/Cidade';
import { CidadesProvider } from '../../database/providers/cidades';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends Omit<ICidade, 'id'> {}

export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
      estadoId: yup.number().required().integer().moreThan(0),
    })
  ),
}));

export const CreateCidades = async (
  req: Request<{}, {}, IBodyProps, {}, {}>,
  res: Response
) => {
  const result = await CidadesProvider.CreateCidades(req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
