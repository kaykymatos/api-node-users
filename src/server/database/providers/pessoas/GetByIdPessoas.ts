import { prisma } from '../../../shared/config/PrismaConfig';
import { IPessoa } from '../../models/Pessoa';

export const GetByIdPessoas = async (id: number): Promise<IPessoa | Error> => {
  try {
    const getEstado = await prisma.pessoa.findFirst({
      where: {
        id: Number(id),
      },
    });
    console.log(id);
    if (getEstado == null || getEstado == undefined)
      return new Error('Cadastro não encontrado!');
    return getEstado;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
