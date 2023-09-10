import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EstadosProvider } from '../../database/providers/estados';

export const GetAllEstados = async (req: Request, res: Response) => {
  const result = await EstadosProvider.GetAllEstados();
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.OK).json(result);
};
