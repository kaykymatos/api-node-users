import { prisma } from '../../../shared/config/PrismaConfig';

export const DeleteEstados = async (id: number): Promise<void | Error> => {
  try {
    const deleteEstado = await prisma.estado.delete({
      where: {
        id: Number(id),
      },
    });
    if (deleteEstado === null || deleteEstado === undefined)
      return new Error('Erro ao deletar registro');
    return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao deletar registro');
  }
};
