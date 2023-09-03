import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { IEstado } from '../../models/Estado';

export const UpdateEstados = async (
  id: number,
  estado: Omit<IEstado, 'id'>
): Promise<void | Error> => {
  try {
    const updateEstado = await PrismaConfig.prisma.estado.update({
      where: {
        id: Number(id),
      },
      data: estado,
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
    return new Error('Erro ao atualizar registro');
  }
};
