import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { ICidade } from '../../models/Cidade';

export const GetByIdCidades = async (id: number): Promise<ICidade | Error> => {
  try {
    const getCidade = await PrismaConfig.prisma.cidades.findFirst({
      where: {
        id: Number(id),
      },
    });
    console.log(id);
    if (getCidade == null || getCidade == undefined) return new Error('Cadastro não encontrado!');
    return getCidade;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
