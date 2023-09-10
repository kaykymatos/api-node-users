import { prisma } from '../../../shared/config/PrismaConfig';

export const DeletePessoas = async (id: number): Promise<void | Error> => {
  try {
    const deletePessoa = await prisma.pessoa.delete({
      where: {
        id: Number(id),
      },
    });
    if (deletePessoa === null || deletePessoa === undefined)
      return new Error('Erro ao deletar registro');
    return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
