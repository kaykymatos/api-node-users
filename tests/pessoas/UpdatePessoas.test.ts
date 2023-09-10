import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - update', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-pessoa5@gmail.com';
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
    const res1 = await testServer.put('/api/v1/pessoas/update/1').send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('update registro', async () => {
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
        email: 'teste-email9@email.com',
        cidadeId: Number(createCidade.body),
      });

    const res1 = await testServer
      .put(`/api/v1/pessoas/update/${createPessoa.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Teste', email:'teste-email10-email9@gmail.com',cidadeId: Number(createCidade.body) });

    expect(res1.statusCode).toEqual(StatusCodes.OK);
  });
});

