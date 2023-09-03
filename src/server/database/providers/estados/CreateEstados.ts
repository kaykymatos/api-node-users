import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { IEstado } from '../../models/Estado';

export const CreateEstados = async (estado: Omit<IEstado, 'id'>): Promise<number | Error> => {
  try {
    const createCidade = await PrismaConfig.prisma.estado.create({
      data: {
        nome: estado.nome,
        uf: estado.uf,
      },
    });
    if (
      createCidade.id === null ||
      createCidade.id === undefined ||
      createCidade.id == 0
    )
      return new Error('Erro ao cadastrar registro');
    return createCidade.id;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};

