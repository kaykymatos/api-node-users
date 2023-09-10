import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - update', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-cidades6@gmail.com';
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
    const res1 = await testServer.put('/api/v1/cidades/update/1').send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('update registro', async () => {
    const createEstado = await testServer
      .post('/api/v1/estados/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo', uf: 'SP' });

    const cidade = await testServer
      .post('/api/v1/cidades/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo2', estadoId: Number(createEstado.body) });

    const res1 = await testServer
      .put(`/api/v1/cidades/update/${cidade.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Teste', estadoId:Number(createEstado.body) });

    expect(res1.statusCode).toEqual(StatusCodes.OK);
  });
});
