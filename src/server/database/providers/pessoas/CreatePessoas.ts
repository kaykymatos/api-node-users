import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { IPessoa } from '../../models/Pessoa';

export const CreatePessoas = async (
  pessoa: Omit<IPessoa, 'id'>
): Promise<number | Error> => {
  try {
    const createEstado = await PrismaConfig.prisma.pessoa.create({
      data: {
        email: pessoa.email,
        nome: pessoa.nome,
        cidadeId: pessoa.cidadeId,
      },
    });
    if (
      createEstado.id === null ||
      createEstado.id === undefined ||
      createEstado.id == 0
    )
      return new Error('Erro ao cadastrar registro');
    return createEstado.id;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
