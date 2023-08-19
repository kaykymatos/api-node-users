
export const DeleteEstados = async (id: number): Promise<void| Error> => {
  try {
    return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar registro');
  }
};