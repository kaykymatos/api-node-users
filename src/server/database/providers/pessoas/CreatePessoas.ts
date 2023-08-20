import { IPessoa } from '../../models/Pessoa';

export const CreatePessoas = async (
  pessoa: Omit<IPessoa, 'id'>
): Promise<number | Error> => {
  try {
    return 1;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
