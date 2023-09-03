import { PrismaConfig } from '../../../shared/config/PrismaConfig';

export const DeleteCidades = async (id: number): Promise<void | Error> => {
  try {
    const deleteCidade = await PrismaConfig.prisma.cidades.delete({
      where: {
        id: Number(id),
      },
    });
    if (deleteCidade === null || deleteCidade === undefined)
      return new Error('Erro ao deletar registro');
    return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao deletar registro');
  }
};

