import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

import Utils from '../../utils/Utils';

class SessionController {
  async store(req, res) {
    // define regras de validação dos dados de entrada
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // valida as regras acima nos dados de entrada
    if (!(await schema.isValid(req.body))) {
      // 400 = Bad Request (pedido ruim / solicitação incorreta)
      return res.status(400).json({ message: 'Validation failed' });
    }

    // obtém e-mail e senha do corpo da requisição
    const { email, password } = req.body;

    // localiza usuario pelo email
    const user = await User.findOne({ where: { email } });

    // verifica usuário
    if (!user) {
      // 401 = Not authorizate (Não autorizado)
      return res.status(401).json({ message: 'User not found' });
    }

    // verifica senha
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Password does not match' });
    }

    // obtém id e nome do usuário
    const { id, name, admin } = user;
    const createdAt = Utils.fixDateToLocaleString(user.createdAt);
    const updatedAt = Utils.fixDateToLocaleString(user.updatedAt);

    // retorna dados do usuário e o token gerado
    return res.json({
      user: {
        id,
        name,
        email: user.email,
        admin,
        createdAt,
        updatedAt,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
