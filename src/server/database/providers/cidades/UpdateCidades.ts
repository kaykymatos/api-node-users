import { ICidade } from '../../models/Cidade';

export const UpdateCidades = async (
  id: number,
  cidade: Omit<ICidade, 'id'>
): Promise<void | Error> => {
  try {
    return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
