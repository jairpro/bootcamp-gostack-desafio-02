import 'dotenv/config';
import app from './app';

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Aplicativo ouvindo na porta ${port}`);
});
