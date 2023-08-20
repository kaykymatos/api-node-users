import { IPessoa } from '../../models/Pessoa';

export const GetAllPessoas = async (): Promise<IPessoa[] | Error> => {
  try {
    return [];
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
