import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Signup - Create',  () => {
 
  it('Tenta criar usuario com email inválido', async () => {
    const res1 = await testServer.post('/api/v1/usuarios/signup').send({
      email: 'create-usuariogmail.com',
      senha: '12345678',
      nome: 'Teste Estados',
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Tenta criar usuario com email muito curto', async () => {
    const res1 = await testServer.post('/api/v1/usuarios/signup').send({
      email: 'a@',
      senha: '12345678',
      nome: 'Teste Estados',
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Tenta criar usuario com email nulo', async () => {
    const res1 = await testServer.post('/api/v1/usuarios/signup').send({
      email: '',
      senha: '12345678',
      nome: 'Teste Estados',
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Tenta criar usuario com nome nulo', async () => {
    const res1 = await testServer.post('/api/v1/usuarios/signup').send({
      email: 'email-pessoa@gmail.com',
      senha: '12345678',
      nome: '',
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
  it('Tenta criar usuario com nome muito curto', async () => {
    const res1 = await testServer.post('/api/v1/usuarios/signup').send({
      email: 'email-pessoa@gmail.com',
      senha: '12345678',
      nome: '12',
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });

  it('Tenta criar usuario com senha nula', async () => {
    const res1 = await testServer.post('/api/v1/usuarios/signup').send({
      email: 'email-pessoa@gmail.com',
      senha: '',
      nome: 'testeusuario',
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.senha');
  });
  it('Tenta criar usuario com senha muito curta', async () => {
    const res1 = await testServer.post('/api/v1/usuarios/signup').send({
      email: 'email-pessoa@gmail.com',
      senha: '121',
      nome: '',
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.senha');
  });

  it('Cria usuário', async () => {
    const res1 = await testServer.post('/api/v1/usuarios/signup').send({
      email: 'usuarionovook223321@gmail.com',
      senha: '2873y867723547234',
      nome: 'Teste usuario novo',
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  });
});
