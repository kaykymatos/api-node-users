import { IEstado } from '../../models/Estado';

export const UpdateEstados = async (
  id: number,
  estado: Omit<IEstado, 'id'>
): Promise<void | Error> => {
  try {
    return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
