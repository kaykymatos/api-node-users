import { IEstado } from '../../models/Estado';

export const GetByIdEstados = async (id: number): Promise<IEstado | Error> => {
  try {
    return {} as IEstado;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};
