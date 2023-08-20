import { IPessoa } from '../../models/Pessoa';

export const GetByIdPessoas = async (id: number): Promise<IPessoa | Error> => {
  try {
    return {} as IPessoa;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
