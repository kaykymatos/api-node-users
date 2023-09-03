import { PrismaConfig } from '../../../shared/config/PrismaConfig';

export const DeleteEstados = async (id: number): Promise<void | Error> => {
  try {
    const updateCidade = await PrismaConfig.prisma.estado.delete({
      where: {
        id: Number(id),
      },
    });
    return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
