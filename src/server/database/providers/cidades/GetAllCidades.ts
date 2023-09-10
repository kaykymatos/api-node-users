import { prisma } from '../../../shared/config/PrismaConfig';
import { ICidade } from '../../models/Cidade';

export const GetAllCidades = async (): Promise<ICidade[] | Error> => {
  try {
    const listCidade = await prisma.cidades.findMany();
    if (listCidade === null || listCidade === undefined) return [];
    return listCidade;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
