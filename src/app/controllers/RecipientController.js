import Recipient from '../models/Recipient';
import Utils from '../../utils/Utils';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();
    if (recipients.length === 0) {
      return res.status(400).json({ message: 'No recipients found' });
    }
    return res.json(
      recipients.map(function(recipient) {
        return RecipientController.format(recipient);
      })
    );
  }

  async show(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ message: 'Recipient not found' });
    }

    return res.json(RecipientController.format(recipient));
  }

  async store(req, res) {
    if (!req.userAdmin) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const data = req.body;

    if (typeof data !== 'object') {
      return res.status(400).json({ message: 'Missing data' });
    }

    const recipient = await Recipient.create(data);

    return res.json(RecipientController.format(recipient));
  }

  async update(req, res) {
    if (!req.userAdmin) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ message: 'Recipient not found' });
    }

    const data = req.body;

    if (typeof data !== 'object') {
      return res.status(400).json({ message: 'Missing data' });
    }

    const recipientUpdated = await recipient.update(data);

    return res.json(RecipientController.format(recipientUpdated));
  }

  async destroy(req, res) {
    if (!req.userAdmin) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ message: 'Recipient not found' });
    }

    const result = await recipient.destroy();

    if (!result) {
      return res.status(500).json({ message: 'Failed to delete recipient' });
    }

    return res.json({ message: 'recipient successfully deleted' });
  }

  static format(recipient) {
    if (typeof recipient !== 'object') {
      return false;
    }
    const {
      id,
      name,
      street,
      number,
      complement,
      zip_code,
      neighborhood,
      city,
      state,
    } = recipient;
    const createdAt = Utils.fixDateToLocaleString(recipient.createdAt);
    const updatedAt = Utils.fixDateToLocaleString(recipient.updatedAt);

    return {
      id,
      name,
      street,
      number,
      complement,
      zip_code,
      neighborhood,
      city,
      state,
      createdAt,
      updatedAt,
    };
  }
}

export default new RecipientController();
