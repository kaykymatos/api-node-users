import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { IEstado } from '../../models/Estado';

export const GetAllEstados = async (): Promise<IEstado[] | Error> => {
  try {
    const listEstado = await PrismaConfig.prisma.estado.findMany();
    if (listEstado === null || listEstado === undefined) return [];
    return listEstado;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar registros');
  }
};

