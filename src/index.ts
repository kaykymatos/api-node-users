import { server } from './server/server';

server.listen(3000, () => {
  console.log(
    `App Rodando porta ${process.env.PORT}\n https://localhost:${
      process.env.PORT
    }`
  );
});
