import { IEstado } from '../../models/Estado';

export const GetAllEstados = async (): Promise<IEstado[] | Error> => {
  try {
    return [];
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
