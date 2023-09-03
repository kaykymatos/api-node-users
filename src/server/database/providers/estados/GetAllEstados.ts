import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { IEstado } from '../../models/Estado';

export const GetAllEstados = async (): Promise<IEstado[] | Error> => {
  try {
    const listCidade = await PrismaConfig.prisma.estado.findMany();
    if (listCidade === null || listCidade === undefined) return [];
    return listCidade;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar registros');
  }
};
