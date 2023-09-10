import { IUsuario } from '../../database/models/Usuario';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { Request, Response } from 'express';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { StatusCodes } from 'http-status-codes';
import { PasswordCrypto } from '../../shared/middleware/PasswordCrypto';
import { JWTService } from '../../shared/services/JWTServices';

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> {}
export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().min(3).max(150),
      senha: yup.string().required(),
    })
  ),
}));

export const Signin = async (
  req: Request<{}, {}, IBodyProps, {}, {}>,
  res: Response
) => {
  const { email, senha } = req.body;

  const usuario = await UsuariosProvider.GetByEmail(email);
  if (usuario instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'E-mail ou senha inválidos!',
      },
    });
  }
  const verifyPass = await PasswordCrypto.verifyPassword(senha, usuario.senha);

  if (!verifyPass) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'E-mail ou senha inválidos!',
      },
    });
  } else {
    const accessToken = JWTService.sign({ uid: usuario.id });
    if (accessToken === 'JWT_SECRETNOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o tokn de acesso!',
        },
      });
    }
    return res.status(StatusCodes.OK).json({ accessToken: accessToken });
  }
};
