import { prisma } from '../../../shared/config/PrismaConfig';
import { IPessoa } from '../../models/Pessoa';

export const GetAllPessoas = async (): Promise<IPessoa[] | Error> => {
  try {
    const listEstado = await prisma.pessoa.findMany();
    if (listEstado === null || listEstado === undefined) return [];
    return listEstado;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
