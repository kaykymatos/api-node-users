import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EstadosProvider } from '../../database/providers/estados';
import { PessoasProvider } from '../../database/providers/pessoas';

export const GetAllPessoas = async (req: Request, res: Response) => {
  const result = await PessoasProvider.GetAllPessoas();
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.OK).json(result);
};
