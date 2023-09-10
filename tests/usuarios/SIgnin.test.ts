import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Signin - Create',  () => {
  it('Efetua Login', async () => {
    await testServer.post('/api/v1/usuarios/signup').send({
      email: 'usuarionovook@gmail.com',
      senha: '2873y867723547234',
      nome: 'Teste usuario novo',
    });
    const res1 = await testServer.post('/api/v1/usuarios/signin').send({
      email: 'usuarionovook@gmail.com',
      senha: '2873y867723547234',
    });

    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body).toHaveProperty('accessToken');
  });

  it('Tenta fazer login com email inválido', async () => {
   
    const res1 = await testServer.post('/api/v1/usuarios/signin').send({
      email: 'u@gmail.com',
      senha: '2873y867723547234',
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('Tenta fazer login com senha inválido', async () => {
   
    const res1 = await testServer.post('/api/v1/usuarios/signin').send({
      email: 'usuario@gmail.com',
      senha: '1',
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
