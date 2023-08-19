import { IEstado } from '../../models/Estado';

export const CreateEstados = async (estado: Omit<IEstado, 'id'>): Promise<number | Error> => {
  try {
    return 1;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};

