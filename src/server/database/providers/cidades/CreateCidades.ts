import { ICidade } from '../../models/Cidade';

export const CreateCidades = async (
  cidade: Omit<ICidade, 'id'>
): Promise<number | Error> => {
  try {
    return 1;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
