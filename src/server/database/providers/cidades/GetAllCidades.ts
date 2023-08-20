import { ICidade } from '../../models/Cidade';

export const GetAllCidades = async (): Promise<ICidade[] | Error> => {
  try {
    return [];
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
