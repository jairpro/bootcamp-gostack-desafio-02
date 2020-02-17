/* eslint-disable no-console */
import app from './app';

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`Aplicativo ouvindo na porta ${port}`);
});
