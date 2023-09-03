import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { IEstado } from '../../models/Estado';

export const GetByIdEstados = async (id: number): Promise<IEstado | Error> => {
  try {
    const getEstado = await PrismaConfig.prisma.estado.findFirst({
      where: {
        id: Number(id),
      },
    });
    console.log(id);
    if (getEstado == null || getEstado == undefined) return new Error('Cadastro não encontrado!');
    return getEstado;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cosultar registro');
  }
};
