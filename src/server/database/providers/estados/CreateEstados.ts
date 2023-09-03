import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { IEstado } from '../../models/Estado';

export const CreateEstados = async (estado: Omit<IEstado, 'id'>): Promise<number | Error> => {
  try {
    const createEstado = await PrismaConfig.prisma.estado.create({
      data: {
        nome: estado.nome,
        uf: estado.uf,
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

