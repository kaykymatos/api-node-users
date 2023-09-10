import { prisma } from '../../../shared/config/PrismaConfig';
import { PasswordCrypto } from '../../../shared/middleware/PasswordCrypto';
import { IUsuario } from '../../models/Usuario';

export const CreateUsuarios = async (
  usuario: Omit<IUsuario, 'id'>
): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);
    const usuarioInsert = await prisma.usuario.create({
      data: { ...usuario, senha: hashedPassword },
    });
    if (
      usuarioInsert === null ||
      usuarioInsert === undefined ||
      usuarioInsert.id === 0
    )
      return new Error('Erro ao tentar criar registro');

    return usuarioInsert.id;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
