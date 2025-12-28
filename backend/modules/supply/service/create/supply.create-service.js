import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

import db from '../../../../core/models/index.js';
import ISupplyCreateService from './supply.interface-create.js';

class SupplyCreateService extends ISupplyCreateService {
  constructor({ supplyRepository }) {
    super();
    this.supplyRepository = supplyRepository;
  }

  async create(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const publicKey = fs.readFileSync(path.resolve(__dirname, '../../../../public_key.pem'), 'utf-8');
      const decodedPayload = jwt.verify(data.user, publicKey, { algorithms: ['RS256'] });
      data.user = decodedPayload.id;
      const supply = await this.supplyRepository.create(data, transaction);
      await transaction.commit();
      return supply;
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

export default SupplyCreateService;