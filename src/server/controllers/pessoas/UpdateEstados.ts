import { Request, Response } from 'express';
import { EstadosProvider } from '../../database/providers/estados';
import { StatusCodes } from 'http-status-codes';
import { IEstado } from '../../database/models/Estado';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { PessoasProvider } from '../../database/providers/pessoas';
import { IPessoa } from '../../database/models/Pessoa';

interface IParamProps {
  id?: number;
}
interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const UpdateValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().optional().moreThan(0),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
      email: yup.string().email().required().min(3).max(150),
      cidadeId: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const UpdatePessoas = async (
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
  const result = await PessoasProvider.UpdatePessoas(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.OK).json(result);
};
