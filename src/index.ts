import { server } from './server/server';

server.listen(3000, () => {
  console.log(
    `App Rodando porta ${process.env.PORT}\n http://localhost:${process.env.PORT}`
  );
});
