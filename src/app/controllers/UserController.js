/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable func-names */
import * as Yup from 'yup';
import Sequelize, { Op } from 'sequelize';
import User from '../models/User';
import Utils from '../../utils/Utils';

class UserController {
  async index(req, res) {
    if (!req.userAdmin) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // lista todos os usuários
    const users = await User.findAll();

    return res.json(
      users.map(function(user) {
        // eslint-disable-next-line no-shadow
        const { id, name, email, admin } = user;
        const createdAt = Utils.fixDateToLocaleString(user.createdAt);
        const updatedAt = Utils.fixDateToLocaleString(user.updatedAt);

        return { id, name, email, admin, createdAt, updatedAt };
      })
    );
  }

  async show(req, res) {
    const schemaId = Yup.object().shape({
      id: Yup.number()
        .integer()
        .required(),
    });

    // valida as regras acima nos dados de entrada
    if (!(await schemaId.isValid(req.params))) {
      // 400 = Bad Request (pedido ruim / solicitação incorreta)
      return res.status(400).json({ message: 'Id validation failed' });
    }
    const { id } = req.params;

    if (!req.userAdmin && id != req.userId) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // localiza usuário pelo id
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Senão, visualiza o usuário pelo id passado na rota
    const { name, email, admin } = user;
    const createdAt = Utils.fixDateToLocaleString(user.createdAt);
    const updatedAt = Utils.fixDateToLocaleString(user.updatedAt);

    return res.json({ id, name, email, admin, createdAt, updatedAt });
  }

  async store(req, res) {
    if (!req.userAdmin) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // define regras de validação dos dados de entrada
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      confirmPassword: Yup.string().when('password', (password, field) =>
        field.required().oneOf([Yup.ref('password')])
      ),
      admin: Yup.boolean(),
    });

    // valida as regras acima nos dados de entrada
    if (!(await schema.isValid(req.body))) {
      // 400 = Bad Request (pedido ruim / solicitação incorreta)
      return res.status(400).json({ message: 'Validation failed' });
    }

    const { name, password } = req.body;
    let { email, admin } = req.body;
    admin = admin !== undefined ? admin : false;

    // localiza usuário pelo e-mail
    email = email.toLowerCase();

    let userExists = false;
    if (process.env.USER_NO_DUPLICATE_NAMES !== 'true') {
      // userExists = await User.findOne({ where: { email } });
      userExists = await User.findOne({
        attributes: ['email'],
        where: [
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('email')), {
            [Op.like]: email,
          }),
        ],
      });
    } else {
      const nameLower = name.toLowerCase();
      userExists = await User.findOne({
        attributes: ['email', 'name'],
        where: {
          [Op.or]: [
            Sequelize.where(Sequelize.fn('lower', Sequelize.col('email')), {
              [Op.like]: email,
            }),
            Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
              [Op.like]: nameLower,
            }),
          ],
        },
      });
    }
    if (userExists) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const bcrypt = require('bcryptjs');
    const password_hash = bcrypt.hashSync(password, 8);

    const newUser = await User.create({
      name,
      email,
      password_hash,
      admin,
    });

    const { id } = newUser;
    let { createdAt } = newUser;

    createdAt = Utils.fixDateToLocaleString(createdAt);

    return res.json({ id, name, email, admin, createdAt });
  }

  async update(req, res) {
    const schemaId = Yup.object().shape({
      id: Yup.number()
        .integer()
        .required(),
    });

    // valida as regras acima nos dados de entrada
    if (!(await schemaId.isValid(req.params))) {
      // 400 = Bad Request (pedido ruim / solicitação incorreta)
      return res.status(400).json({ message: 'Id validation failed' });
    }

    const { id } = req.params;

    if (!req.userAdmin && id != req.userId) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // localiza usuário pelo e-mail
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const { password } = req.body;
    let { password_hash } = user;
    if (password) {
      // define regras de validação dos dados de entrada
      // para troca de senha
      const schemaPassword = Yup.object().shape({
        oldPassword: Yup.string()
          .required()
          .min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        // eslint-disable-next-line no-shadow
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      });

      if (!(await schemaPassword.isValid(req.body))) {
        return res.status(400).json({ message: 'Password validation failed' });
      }

      const { oldPassword } = req.body;

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ message: 'Password does not match' });
      }

      const bcrypt = require('bcryptjs');
      password_hash = bcrypt.hashSync(password, 8);
    }
    // define regras de validação dos dados de entrada
    // para alteração de campos
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    // valida as regras acima nos dados de entrada
    if (!(await schema.isValid(req.body))) {
      // 400 = Bad Request (pedido ruim / solicitação incorreta)
      return res.status(400).json({ message: 'Data validation failed' });
    }

    let { name, email, admin } = req.body;

    // verifica se o nome foi informado e se é diferente do nome do usuário
    if (!name) {
      name = user.name;
    } else if (process.env.USER_NO_DUPLICATE_NAMES === 'true') {
      const nameLower = name.toLowerCase();
      if (nameLower !== name) {
        try {
          // localiza usuário pelo nome
          const userNameExists = await User.findOne({
            attributes: ['id', 'name'],
            where: [
              { id: { [Op.ne]: id } },
              Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
                [Op.like]: nameLower,
              }),
            ],
          });

          if (userNameExists) {
            return res.status(400).json({ message: 'Name not available' });
          }
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Fetching name failed: ${err.message}` });
        }
      }
    }

    // verifica se o email foi informado e se é diferente do email do usuário
    if (!email) {
      email = user.email;
    } else {
      email = email.toLowerCase();
      if (email !== user.email) {
        // Verifica se o e-mail a ser alterado já pertente a outro usuário
        try {
          const userEmailExists = await User.findOne({
            // email: {[Op.like]: email}, id: { [Op.ne]: id }
            attributes: ['id', 'email'],
            where: [
              { id: { [Op.ne]: id } },
              Sequelize.where(Sequelize.fn('lower', Sequelize.col('email')), {
                [Op.like]: email,
              }),
            ],
          });

          if (userEmailExists) {
            return res.status(400).json({ message: 'Email not available' });
          }
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Failed to fetch email: ${err.message}` });
        }
      }
    }

    user.name = name;
    user.email = email;
    user.password_hash = password_hash;
    if (req.userAdmin && admin !== undefined) {
      user.admin = admin;
    } else {
      admin = user.admin;
    }

    const modifyData =
      user._changed.name === true ||
      user._changed.email === true ||
      user._changed.admin === true;
    const modifyPassword = user._changed.password_hash === true;
    const modify = modifyData || modifyPassword;
    let message = '';

    if (modify) {
      // await user.update({ name, email, password_hash });
      await user.update({ name, email, admin, password_hash });

      if (!modifyData && modifyPassword) {
        message = 'Password changed successfully';
      } else if (modifyData && !modifyPassword) {
        message = 'Successfully changed data';
      } else {
        message = 'Successfully changed data and password';
      }
    } else {
      message = 'No changes';
    }
    const createdAt = Utils.fixDateToLocaleString(user.createdAt);
    const updatedAt = Utils.fixDateToLocaleString(user.updatedAt);

    return res.json({
      modify,
      message,
      user: { id, name, email, admin, createdAt, updatedAt },
    });
  }

  async destroy(req, res) {
    if (!req.userAdmin) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // define regras de validação dos dados de entrada
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .required()
        .notOneOf([1]),
    });

    // valida as regras acima nos dados de entrada
    if (!(await schema.isValid(req.params))) {
      // 400 = Bad Request (pedido ruim / solicitação incorreta)
      return res.status(400).json({ message: 'Validation failed' });
    }

    const { id } = req.params;

    // localiza usuário pelo e-mail
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const result = await user.destroy();

    if (!result) {
      return res.status(500).json({ message: 'Failed to delete user' });
    }

    return res.json({ message: 'User successfully deleted' });
  }
}

export default new UserController();
