import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { ICidade } from '../../models/Cidade';

export const UpdateCidades = async (
  id: number,
  cidade: Omit<ICidade, 'id'>
): Promise<void | Error> => {
  try {
    const updateCidade = await PrismaConfig.prisma.cidades.update({
      where: {
        id: Number(id),
      },
      data: cidade,
    });
    if (updateCidade.id === null || updateCidade.id === undefined || updateCidade.id === 0)
      return new Error('Erro ao tentar atualizar registro');
    return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
