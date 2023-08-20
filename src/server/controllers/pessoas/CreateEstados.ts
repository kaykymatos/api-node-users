import { IEstado } from '../../database/models/Estado';
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { EstadosProvider } from '../../database/providers/estados';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/pessoas';
import { IPessoa } from '../../database/models/Pessoa';

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
      email: yup.string().email().required().min(3).max(150),
      cidadeId: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const CreatePessoas = async (
  req: Request<{}, {}, IBodyProps, {}, {}>,
  res: Response
) => {
  const result = await PessoasProvider.CreatePessoas(req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
