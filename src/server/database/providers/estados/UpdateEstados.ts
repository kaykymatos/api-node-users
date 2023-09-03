import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { IEstado } from '../../models/Estado';

export const UpdateEstados = async (
  id: number,
  estado: Omit<IEstado, 'id'>
): Promise<void | Error> => {
  try {
    const updateCidade = await PrismaConfig.prisma.estado.update({
      where: {
        id: Number(id),
      },
      data: estado,
    });
    console.log(id);
    if (updateCidade.id === null || updateCidade.id === undefined || updateCidade.id === 0)
      return new Error('Erro ao tentar atualizar registro');
    return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar registro');
  }
};

