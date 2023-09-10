import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Estados - update', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-estados6@gmail.com';
    await testServer.post('/api/v1/usuarios/signup').send({
      email,
      senha: '12345678',
      nome: 'Teste Estados',
    });
    const signinRes = await testServer
      .post('/api/v1/usuarios/signin')
      .send({ email, senha: '12345678' });
    accessToken = signinRes.body.accessToken;
  });
  it('Tenta acessar update sem estar autenticado', async () => {
    const res1 = await testServer.put('/api/v1/estados/update/1').send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('pdate registro', async () => {
    const createEstado = await testServer
      .post('/api/v1/estados/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo2', uf: 'SP' });

    const res1 = await testServer
      .put(`/api/v1/estados/update/${createEstado.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Acre', uf: 'AC' });

    expect(res1.statusCode).toEqual(StatusCodes.OK);
  });
});
