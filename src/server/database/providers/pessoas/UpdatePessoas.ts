import { IPessoa } from '../../models/Pessoa';

export const UpdatePessoas = async (
  id: number,
  pessoa: Omit<IPessoa, 'id'>
): Promise<void | Error> => {
  try {
    return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
