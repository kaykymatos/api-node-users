import { IUsuario } from '../../database/models/Usuario';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { Response, Request } from 'express';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends Omit<IUsuario, 'id'> {}
export const validationBodySignUp = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      email: yup.string().email().required().min(5),
      senha: yup.string().required().min(6),
    })
  ),
}));
export const SignUp = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await UsuariosProvider.CreateUsuarios(req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
