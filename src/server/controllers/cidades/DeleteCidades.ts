import { Request, Response } from 'express';
import { EstadosProvider } from '../../database/providers/estados';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { CidadesProvider } from '../../database/providers/cidades';

interface IParamProps {
  id?: number;
}
export const DeleteValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().optional().moreThan(0),
    })
  ),
}));

export const DeleteCidades = async (
  req: Request<IParamProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parametro "Id" precisa ser maior que 0!',
      },
    });
  }
  const result = await CidadesProvider.DeleteCidades(req.params.id);
  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  return res.status(StatusCodes.NO_CONTENT).json(result);
};
