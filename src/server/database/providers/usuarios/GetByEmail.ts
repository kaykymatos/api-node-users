import { PrismaConfig } from '../../../shared/config/PrismaConfig';
import { IUsuario } from '../../models/Usuario';

export const GetByEmail = async (email: string): Promise<IUsuario | Error> => {
  try {
    const usuario = await PrismaConfig.prisma.usuario.findFirst({
      where: {
        email: email,
      },
    });
    if (usuario === null) return new Error('Email não encontrado!');
    return usuario;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};

