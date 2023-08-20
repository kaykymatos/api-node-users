import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EstadosProvider } from '../../database/providers/estados';
import { CidadesProvider } from '../../database/providers/cidades';



export const GetAllCidades = async ( req: Request, res: Response) => {
  const result = await CidadesProvider.GetAllCidades();
  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  return res.status(StatusCodes.OK).json(result);
};