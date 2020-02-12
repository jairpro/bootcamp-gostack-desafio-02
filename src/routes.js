import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';
import Utils from './utils/Utils';

const routes = new Router();

routes.get('/', (req, res) => {
  const agora = Utils.fixDateToLocaleString(new Date().toLocaleString());
  res.send(`Olá! agora é ${agora}`);
});

// Rotas sem autenticar
// --------------------
routes.post('/sessions', SessionController.store);

// Autenticação
// ------------
routes.use(authMiddleware);

// Rotas que requerem autenticação
// -------------------------------
//
// Rotas de Usuários
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

// Rotas de Destinatarios
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.get('/recipients/:id', RecipientController.show);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.destroy);

export default routes;
