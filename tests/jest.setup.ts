import supertest from 'supertest';
import { prisma } from '../src/server/shared/config/PrismaConfig';
import { execSync } from 'child_process';
import { server } from '../src/server/server';

beforeAll(async () => {
  // Aplicar a migração antes dos testes
  execSync('npx prisma db push', {
    stdio: 'inherit',
  });
});

afterAll(async () => {
  // Limpar o banco de dados de teste e desconectar o cliente Prisma
  await prisma.$disconnect();
});
export const testServer = supertest(server);

