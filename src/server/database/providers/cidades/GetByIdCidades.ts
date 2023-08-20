import { ICidade } from '../../models/Cidade';

export const GetByIdCidades = async (id: number): Promise<ICidade | Error> => {
  try {
    return {} as ICidade;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
