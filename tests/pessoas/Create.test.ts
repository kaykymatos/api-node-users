import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Create', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-pessoa@gmail.com';
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
  it('Tenta criar uma pessoa sem estar autenticado', async () => {
    const res1 = await testServer
      .post('/api/v1/cidades/create')
      .send({ nome: 'pessoa', email: 'teste-email1@gmail.com', cidadeId: 1 });

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

    const resPessoa = await testServer
      .post('/api/v1/pessoas/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'pessoa',
        email: 'teste-email2@gmail.com',
        cidadeId: Number(resCidade.body),
      });
    expect(resPessoa.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resPessoa.body).toEqual('number');
  });
  it('Tenta criar um registro com nome muito curto', async () => {
    const res1 = await testServer
      .post('/api/v1/estados/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo', uf: 'SP' });

    const resCidade = await testServer
      .post('/api/v1/cidades/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Cidade1', estadoId: Number(res1.body) });

    const resPessoa = await testServer
      .post('/api/v1/pessoas/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'P',
        email: 'teste-email3@gmail.com',
        cidadeId: Number(resCidade.body),
      });

    expect(resPessoa.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resPessoa.body).toHaveProperty('errors.body.nome');
  });
  it('Tenta criar um registro com email inválido', async () => {
    const res1 = await testServer
      .post('/api/v1/estados/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo', uf: 'SP' });

    const resCidade = await testServer
      .post('/api/v1/cidades/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Cidade', estadoId: Number(res1.body) });

    const resPessoa = await testServer
      .post('/api/v1/pessoas/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Pedro',
        email: 'teste-email4gmail.com',
        cidadeId: Number(resCidade.body),
      });

    expect(resPessoa.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resPessoa.body).toHaveProperty('errors.body.email');
  });

  it('Tenta criar um registro com email muito curto', async () => {
    const res1 = await testServer
      .post('/api/v1/estados/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo', uf: 'SP' });

    const resCidade = await testServer
      .post('/api/v1/cidades/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Cidade', estadoId: Number(res1.body) });

    const resPessoa = await testServer
      .post('/api/v1/pessoas/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Pedro',
        email: 'a@',
        cidadeId: Number(resCidade.body),
      });

    expect(resPessoa.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resPessoa.body).toHaveProperty('errors.body.email');
  });

  it('Tenta criar um registro com id da cidade inválido', async () => {
    const res1 = await testServer
      .post('/api/v1/estados/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo', uf: 'SP' });

    const resCidade = await testServer
      .post('/api/v1/cidades/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Cidade', estadoId: Number(res1.body) });

    const resPessoa = await testServer
      .post('/api/v1/pessoas/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Pedro',
        email: 'teste-email5@gmail.com',
        cidadeId: 0,
      });

    expect(resPessoa.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resPessoa.body).toHaveProperty('errors.body.cidadeId');
  });
});

