import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { ICidade } from '../../models/Cidade';

export const CreateCidades = async (
  cidade: Omit<ICidade, 'id'>
): Promise<number | Error> => {
  try {
    const createCidade = await PrismaConfig.prisma.cidades.create({
      data: {
        nome: cidade.nome,
        estadoId: cidade.estadoId,
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
