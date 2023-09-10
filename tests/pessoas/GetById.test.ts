import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Get by id', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-pessoa4@gmail.com';
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
  it('Tenta acessar getbyid sem estar autenticado', async () => {
    const res1 = await testServer.get('/api/v1/pessoas/get-by-id/1').send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('Retorna registros', async () => {
    const createEstado = await testServer
      .post('/api/v1/estados/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo', uf: 'SP' });

    const createCidade = await testServer
      .post('/api/v1/cidades/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo2', estadoId: Number(createEstado.body) });

    const createPessoa = await testServer
      .post('/api/v1/pessoas/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'aaa',
        email: 'teste-email8@email.com',
        cidadeId: Number(createCidade.body),
      });

    const res1 = await testServer
      .get(`/api/v1/pessoas/get-by-id/${createPessoa.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.OK);
  });
});

