import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Estados - Create', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-cidades1@gmail.com';
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
  it('Tenta criar uma cidade sem estar autenticado', async () => {
    const res1 = await testServer
      .post('/api/v1/cidades/create')
      .send({ nome: 'Cidade', estadoId: 1 });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('Cria registro', async () => {
    const res1 = await testServer
      .post('/api/v1/estados/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo', uf: 'SP' });

    const resCidade = await testServer
      .post('/api/v1/cidades/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Cidade', estadoId: Number(res1.body) });

    expect(resCidade.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resCidade.body).toEqual('number');
  });
  it('Tenta criar um registro com nome muito curto', async () => {
    const res1 = await testServer
      .post('/api/v1/estados/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo', uf: 'SP' });

    const resCidade = await testServer
      .post('/api/v1/cidades/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'C', estadoId: Number(res1.body) });

    expect(resCidade.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCidade.body).toHaveProperty('errors.body.nome');
  });
});

