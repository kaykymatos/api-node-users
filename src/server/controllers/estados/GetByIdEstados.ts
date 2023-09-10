import { Request, Response } from 'express';
import { EstadosProvider } from '../../database/providers/estados';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IParamProps {
  id?: number;
}
export const GetByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required().integer().moreThan(0),
    })
  ),
}));

export const GetByIdEstados = async (
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
  const result = await EstadosProvider.GetByIdEstados(req.params.id);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.OK).json(result);
};
