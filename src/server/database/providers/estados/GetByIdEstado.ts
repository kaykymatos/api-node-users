import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { IEstado } from '../../models/Estado';

export const GetByIdEstados = async (id: number): Promise<IEstado | Error> => {
  try {
    const getCidade = await PrismaConfig.prisma.estado.findFirst({
      where: {
        id: Number(id),
      },
    });
    console.log(id);
    if (getCidade == null || getCidade == undefined) return new Error('Cadastro não encontrado!');
    return getCidade;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cosultar registro');
  }
};
