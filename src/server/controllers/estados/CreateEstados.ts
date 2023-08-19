import { IEstado } from '../../database/models/Estado';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';

interface IBodyProps extends Omit<IEstado, 'id'> {}

export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
      uf: yup.string().required().min(3).max(150),
    })
  ),
}));

export const CreateEstados = async (
  estado: Omit<IEstado, 'id'>
): Promise<number | Error> => {
  try {
    return 1;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};

