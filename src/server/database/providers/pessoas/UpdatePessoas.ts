import { prisma } from '../../../shared/config/PrismaConfig';
import { IPessoa } from '../../models/Pessoa';

export const UpdatePessoas = async (
  id: number,
  pessoa: Omit<IPessoa, 'id'>
): Promise<void | Error> => {
  try {
    const updateEstado = await prisma.pessoa.update({
      where: {
        id: Number(id),
      },
      data: pessoa,
    });
    if (
      updateEstado.id === null ||
      updateEstado.id === undefined ||
      updateEstado.id === 0
    )
      return new Error('Erro ao tentar atualizar registro');
    return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
