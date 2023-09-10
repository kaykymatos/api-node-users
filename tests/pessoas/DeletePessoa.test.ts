import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Delete', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-pessoa2@gmail.com';
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
  it('Tenta deletar uma estado sem estar autenticado', async () => {
    const res1 = await testServer.delete('/api/v1/pessoas/delete/1');

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('Deleta registro', async () => {
    const createEstado = await testServer
      .post('/api/v1/estados/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo', uf: 'SP' });

    const createCidade = await testServer
      .post('/api/v1/cidades/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Sao Paulo', estadoId: createEstado.body });

    const createPessoa = await testServer
      .post('/api/v1/pessoas/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'aaa',
        email: 'teste-email6@email.com',
        cidadeId: Number(createCidade.body),
      });
    const res1 = await testServer
      .delete(`/api/v1/pessoas/delete/${createPessoa.body}`)
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta deletar registro sem passar parâmetro', async () => {
    const res1 = await testServer
      .delete('/api/v1/pessoas/delete/0')
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.params.id');
  });
});

